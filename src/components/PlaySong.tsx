import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { FunctionComponent, useMemo, useState } from "react";
import { useGetSongQuery, useHlsJs } from "modules/song";
import { Stack, Typography } from "@mui/material";
import IconMessage from "./IconMessage";

interface PlaySongProps {
  readonly id: string;
}

const PlaySong: FunctionComponent<PlaySongProps> = ({ id }) => {
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false);

  const { data: song, isLoading } = useGetSongQuery(id);

  const hlsJsParams = useMemo(
    () => ({
      onPlaySong: () => setIsSongPlaying(true),
      onStopSong: () => setIsSongPlaying(false),
      onSongEnded: () => setIsSongPlaying(false),
    }),
    []
  );

  const { playSong, stopSong } = useHlsJs(hlsJsParams);

  if (isLoading) return null;

  return song ? (
    <Stack sx={ { cursor: "pointer", width: "100%", height: "100%" } }>
      { isSongPlaying ? (
        <IconMessage
          icon={ <StopIcon /> }
          message="Stop song"
          onClick={ () => stopSong(song) }
        />
      ) : (
        <IconMessage
          icon={ <PlayArrowIcon /> }
          message="Play song"
          onClick={ () => playSong(song) }
        />
      ) }
    </Stack>
  ) : (
    <Typography>Unable to play song</Typography>
  );
};

export default PlaySong;
