import { FunctionComponent, useEffect, useMemo, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Stack, Typography } from "@mui/material";
import {
  Song,
  useFetchSongStreamThunk,
  useGetSongQuery,
  useHlsJs,
} from "@newm.io/studio/modules/song";
import { PlayerState } from "@newm.io/studio/common";
import IconMessage from "./IconMessage";

interface PlaySongProps {
  readonly id: string;
}

const PlaySong: FunctionComponent<PlaySongProps> = ({ id }) => {
  const { data: song, isLoading } = useGetSongQuery(id);

  const [playerState, setPlayerState] = useState<PlayerState>({
    isReadyToPlay: false,
  });

  const [fetchStreamData, fetchStreamDataResp] = useFetchSongStreamThunk();

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

  // Keep song in a playing state till the song has been filtered out
  useEffect(() => {
    const isSongFound = song?.id === playerState.currentPlayingSongId;

    if (!isSongFound) {
      stopSong();
    }
  }, [playerState.currentPlayingSongId, song, stopSong]);

  if (isLoading) return null;

  return song?.streamUrl ? (
    <Stack sx={{ cursor: "pointer", width: "100%", height: "100%" }}>
      <IconMessage
        icon={
          playerState.currentPlayingSongId ? <StopIcon /> : <PlayArrowIcon />
        }
        message={playerState.currentPlayingSongId ? "Stop song" : "Play song"}
        onClick={() => handleSongPlayPause(song)}
      />
    </Stack>
  ) : (
    <Typography>Unable to play song</Typography>
  );
};

export default PlaySong;
