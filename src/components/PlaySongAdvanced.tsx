import { FunctionComponent } from "react";
import { IconButton, Stack, SxProps } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Song } from "modules/song";

interface PlaySongAdvancedProps {
  readonly contentSx?: SxProps;
  readonly isPlaying: boolean;
  readonly onPlayPause: (song: Song) => void;
  readonly song: Song | undefined;
}

const PlaySongAdvanced: FunctionComponent<PlaySongAdvancedProps> = ({
  contentSx,
  isPlaying,
  onPlayPause,
  song,
}) => {
  return song ? (
    <Stack
      sx={ {
        alignItems: "center",
        justifyContent: "center",
        ...contentSx,
      } }
    >
      <IconButton color="inherit" onClick={ () => onPlayPause(song) }>
        { isPlaying ? <StopIcon /> : <PlayArrowIcon /> }
      </IconButton>
    </Stack>
  ) : null;
};

export default PlaySongAdvanced;
