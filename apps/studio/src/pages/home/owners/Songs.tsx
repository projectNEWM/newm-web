import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { IconButton, Stack } from "@mui/material";
import { PlayArrow, Stop } from "@mui/icons-material";
import {
  MintingStatus,
  Song,
  SortOrder,
  useFetchSongStreamThunk,
  useGetSongCountQuery,
  useGetSongsQuery,
  useHlsJs,
} from "../../../modules/song";
import { Typography } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { PlayerState, getResizedAlbumCoverImageUrl } from "../../../common";
import { useWindowDimensions } from "@newm-web/utils";
import { bgImage } from "@newm-web/assets";

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
          isReadyToPlay: false,
          currentPlayingSongId: id,
        }));
      },
      onStopSong: () => {
        setPlayerState((prevState) => ({
          ...prevState,
          isReadyToPlay: false,
          currentPlayingSongId: undefined,
        }));
      },
      onSongEnded: () => {
        setPlayerState((prevState) => ({
          ...prevState,
          isReadyToPlay: false,
          currentPlayingSongId: undefined,
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
        song: fetchStreamDataResp.data?.song,
        isReadyToPlay: true,
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
      <Typography sx={{ marginTop: 8, textAlign: "center" }}>
        This artist does not have any minted songs yet.
      </Typography>
    );
  }

  return (
    <Stack
      columnGap={2}
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      mt={7.5}
      rowGap={3}
    >
      {songs.map((song) => {
        const genresString = song.genres.join(", ");

        return (
          <Stack
            key={song.id}
            sx={{ maxWidth: ["150px", "150px", "260px"], rowGap: 0.5 }}
          >
            <Stack display="grid" justifyItems="center" alignItems="center">
              <img
                alt="Song cover art"
                height={isWidthAboveMd ? "260px" : "150px"}
                width={isWidthAboveMd ? "260px" : "150px"}
                src={
                  song.coverArtUrl
                    ? getResizedAlbumCoverImageUrl(song.coverArtUrl, {
                        width: 200,
                        height: 200,
                      })
                    : bgImage
                }
                style={{
                  borderRadius: "4px",
                  objectFit: "cover",
                  gridArea: "1 / 1 / 2 / 2",
                }}
              />
              {song?.streamUrl && (
                <IconButton
                  onClick={() => handleSongPlayPause(song)}
                  sx={{
                    color: theme.colors.white,
                    gridArea: "1 / 1 / 2 / 2",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {song.id === playerState.currentPlayingSongId ? (
                    <Stop sx={{ fontSize: isWidthAboveMd ? "60px" : "40px" }} />
                  ) : (
                    <PlayArrow
                      sx={{ fontSize: isWidthAboveMd ? "60px" : "40px" }}
                    />
                  )}
                </IconButton>
              )}
            </Stack>
            <Typography variant="h4" fontWeight={700} mt={0.5}>
              {song.title}
            </Typography>
            <Typography variant="subtitle1" fontWeight={500}>
              {genresString}
            </Typography>
          </Stack>
        );
      })}
      <Stack ref={ref} flex="1 0 100%" textAlign="center">
        {hasMore ? <Typography>Loading more songs...</Typography> : null}
      </Stack>
    </Stack>
  );
};

export default Songs;
