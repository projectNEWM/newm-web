import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Stack } from "@mui/material";
import { Typography } from "@newm-web/elements";
import { SongCard } from "@newm-web/components";
import { useHlsJs } from "@newm-web/utils";
import { MintingStatus, PlayerState, Song, SortOrder } from "@newm-web/types";
import {
  useFetchSongStreamThunk,
  useGetSongCountQuery,
  useGetSongsQuery,
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

  const { data: { count: totalCountOfSongs = 0 } = {} } = useGetSongCountQuery({
    mintingStatuses,
    ownerIds: [userId],
  });

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
          <SongCard
            coverArtUrl={ song.coverArtUrl }
            isPlayable={ !!song.streamUrl }
            isPlaying={ song.id === playerState.currentPlayingSongId }
            key={ song.id }
            subtitle={ genresString }
            title={ song.title }
            onPlayPauseClick={ () => handleSongPlayPause(song) }
          />
        );
      }) }
      <Stack flex="1 0 100%" ref={ ref } textAlign="center">
        { hasMore ? <Typography>Loading more songs...</Typography> : null }
      </Stack>
    </Stack>
  );
};

export default Songs;
