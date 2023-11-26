import { FunctionComponent } from "react";
import { PlayArrow, Stop } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { Tooltip } from "@newm.io/studio/elements";
import theme from "@newm.io/theme";

interface SongStreamPlaybackIconProps {
  readonly isSongPlaying: boolean;
  readonly isSongUploaded: boolean;
}

/**
 * Displays a horizontal icon and message.
 */
const SongStreamPlaybackIcon: FunctionComponent<SongStreamPlaybackIconProps> = ({ isSongPlaying, isSongUploaded }) => {
  const renderSongPlaybackIcon = (): JSX.Element => {
    if (isSongPlaying) {
      return <Stop sx={ { color: theme.colors.white } } />;
    } else {
      return <PlayArrow sx={ { color: theme.colors.white } } />;
    }
  };

  const renderUploadInProgressIcon = () => {
    return (
      <Tooltip title={ "Upload in progress. Please allow a few " + "minutes to complete the process." }>
        <CircularProgress disableShrink size={ 24 } color="secondary" />
      </Tooltip>
    );
  };

  return isSongUploaded ? renderSongPlaybackIcon() : renderUploadInProgressIcon();
};
export default SongStreamPlaybackIcon;
