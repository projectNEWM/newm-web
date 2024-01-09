import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { IconButton, Stack } from "@mui/material";
import { PlayArrow, Stop } from "@mui/icons-material";
import { Typography } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { useWindowDimensions } from "@newm-web/utils";
import { bgImage } from "@newm-web/assets";
import { PlayerState, getResizedAlbumCoverImageUrl } from "../../../common";
import {
  MintingStatus,
  Song,
  SortOrder,
  useFetchSongStreamThunk,
  useGetSongCountQuery,
  useGetSongsQuery,
  useHlsJs,
} from "../../../modules/song";

const Songs: FunctionComponent = () => {
  const limit = 25;
  const mintingStatuses = [MintingStatus.Minted];
  const { userId = "" } = useParams();
  const [offset, setOffset] = useState(0);
  const [songs, setSongs] = useState<Song[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [playerState, setPlayerState] = useState<PlayerState>({
    isReadyToPlay: false,
  });
  const [fetchStreamData, fetchStreamDataResp] = useFetchSongStreamThunk();

  const windowWidth = useWindowDimensions()?.width;
  const { data: { count: totalCountOfSongs = 0 } = {} } = useGetSongCountQuery({
    mintingStatuses,
    ownerIds: [userId],
  });

  const isWidthAboveMd =
    windowWidth && windowWidth > theme.breakpoints.values.md;

  const { data: songData = [], isLoading } = useGetSongsQuery({
    limit,
    mintingStatuses,
    offset,
    ownerIds: [userId],
    sortOrder: SortOrder.Desc,
  });

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const hlsJsParams = useMemo(
    () => ({
      onPlaySong: ({ id }: Song) => {
        setPlayerState((prevState) => ({
          ...prevState,
          currentPlayingSongId: id,
          isReadyToPlay: false,
        }));
      },
      onSongEnded: () => {
        setPlayerState((prevState) => ({
          ...prevState,
          currentPlayingSongId: undefined,
          isReadyToPlay: false,
        }));
      },
      onStopSong: () => {
        setPlayerState((prevState) => ({
          ...prevState,
          currentPlayingSongId: undefined,
          isReadyToPlay: false,
        }));
      },
    }),
    []
  );

  const { playSong, stopSong } = useHlsJs(hlsJsParams);

  /**
   * Plays and/or stops the song depending on if it's currently playing or not.
   */
  const handleSongPlayPause = (song: Song) => {
    const isSongPlaying = playerState.currentPlayingSongId;
    const isNewSong = song.id !== playerState.currentPlayingSongId;

    if (isSongPlaying) stopSong(song);
    if (isNewSong) {
      setPlayerState((prevState) => ({
        ...prevState,
        loadingSongId: song.id,
      }));
      fetchStreamData(song);
    }
  };

  /**
   * Handles infinite scrolling: modifies offset to trigger a fetch for more songs.
   * If there are no more songs to fetch, sets hasMore to false.
   */
  useEffect(() => {
    if (inView && !isLoading && songs.length < totalCountOfSongs) {
      setSongs((prevSongs) => [...prevSongs, ...songData]);
      setOffset((prevOffset) => prevOffset + limit);
    } else if (songs.length >= totalCountOfSongs) {
      setHasMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, songData, totalCountOfSongs, isLoading]);

  // handles the stream metadata response when loading a song
  useEffect(() => {
    if (fetchStreamDataResp.isLoading) {
      return;
    }

    if (
      fetchStreamDataResp.data &&
      playerState.loadingSongId === fetchStreamDataResp.data.song.id
    ) {
      setPlayerState((prevState) => ({
        ...prevState,
        isReadyToPlay: true,
        song: fetchStreamDataResp.data?.song,
      }));
    }
  }, [
    playerState.loadingSongId,
    fetchStreamDataResp.isLoading,
    fetchStreamDataResp.data,
    playSong,
  ]);

  // when a songs stream information is ready - play the song
  useEffect(() => {
    if (playerState.isReadyToPlay && playerState.song) {
      playSong(playerState.song);
    }
  }, [
    playerState.song,
    playerState.loadingSongId,
    playerState.isReadyToPlay,
    playSong,
  ]);

  if (!songs.length && !songData.length && !isLoading) {
    return (
      <Typography sx={ { marginTop: 8, textAlign: "center" } }>
        This artist does not have any minted songs yet.
      </Typography>
    );
  }

  return (
    <Stack
      columnGap={ 2 }
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      mt={ 7.5 }
      rowGap={ 3 }
    >
      { songs.map((song) => {
        const genresString = song.genres.join(", ");

        return (
          <Stack
            key={ song.id }
            sx={ { maxWidth: ["150px", "150px", "260px"], rowGap: 0.5 } }
          >
            <Stack alignItems="center" display="grid" justifyItems="center">
              <img
                alt="Song cover art"
                height={ isWidthAboveMd ? "260px" : "150px" }
                src={
                  song.coverArtUrl
                    ? getResizedAlbumCoverImageUrl(song.coverArtUrl, {
                        height: 200,
                        width: 200,
                      })
                    : bgImage
                }
                style={ {
                  borderRadius: "4px",
                  gridArea: "1 / 1 / 2 / 2",
                  objectFit: "cover",
                } }
                width={ isWidthAboveMd ? "260px" : "150px" }
              />
              { song?.streamUrl && (
                <IconButton
                  sx={ {
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    color: theme.colors.white,
                    gridArea: "1 / 1 / 2 / 2",
                  } }
                  onClick={ () => handleSongPlayPause(song) }
                >
                  { song.id === playerState.currentPlayingSongId ? (
                    <Stop sx={ { fontSize: isWidthAboveMd ? "60px" : "40px" } } />
                  ) : (
                    <PlayArrow
                      sx={ { fontSize: isWidthAboveMd ? "60px" : "40px" } }
                    />
                  ) }
                </IconButton>
              ) }
            </Stack>
            <Typography fontWeight={ 700 } mt={ 0.5 } variant="h4">
              { song.title }
            </Typography>
            <Typography fontWeight={ 500 } variant="subtitle1">
              { genresString }
            </Typography>
          </Stack>
        );
      }) }
      <Stack flex="1 0 100%" ref={ ref } textAlign="center">
        { hasMore ? <Typography>Loading more songs...</Typography> : null }
      </Stack>
    </Stack>
  );
};

export default Songs;
