import { FunctionComponent } from "react";
import { PlayArrow, Stop } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { Tooltip } from "@newm-web/elements";
import theme from "@newm-web/theme";

interface SongStreamPlaybackIconProps {
  readonly isSongPlaying: boolean;
  readonly isSongUploaded: boolean;
}

/**
 * Displays a horizontal icon and message.
 */
const SongStreamPlaybackIcon: FunctionComponent<
  SongStreamPlaybackIconProps
> = ({ isSongPlaying, isSongUploaded }) => {
  const renderSongPlaybackIcon = (): JSX.Element => {
    if (isSongPlaying) {
      return <Stop sx={ { color: theme.colors.white } } />;
    } else {
      return <PlayArrow sx={ { color: theme.colors.white } } />;
    }
  };

  const renderUploadInProgressIcon = () => {
    return (
      <Tooltip
        title={
          "Upload in progress. Please allow a few " +
          "minutes to complete the process."
        }
      >
        <CircularProgress color="secondary" size={ 24 } disableShrink />
      </Tooltip>
    );
  };

  return isSongUploaded
    ? renderSongPlaybackIcon()
    : renderUploadInProgressIcon();
};
export default SongStreamPlaybackIcon;
