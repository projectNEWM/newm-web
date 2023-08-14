import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { FunctionComponent, useMemo, useState } from "react";
import { useGetSongQuery, useHlsJs } from "modules/song";
import { Typography } from "@mui/material";
import IconMessage from "./IconMessage";

interface PlaySongProps {
  readonly id: string;
}

const PlaySong: FunctionComponent<PlaySongProps> = ({ id }) => {
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false);

  const { data: song } = useGetSongQuery(id);

  const hlsJsParams = useMemo(
    () => ({
      onPlaySong: () => setIsSongPlaying(true),
      onStopSong: () => setIsSongPlaying(false),
      onSongEnded: () => setIsSongPlaying(false),
    }),
    []
  );

  const { playSong, stopSong } = useHlsJs(hlsJsParams);

  return song ? (
    <>
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
    </>
  ) : (
    <Typography>Unable to play song</Typography>
  );
};

export default PlaySong;
