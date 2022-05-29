import { Box } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import AddSongIcon from "assets/images/AddSong";
import DashedOutline from "./styled/DashedOutline";
import IconMessage from "./IconMessage";

interface UploadImageProps {
  readonly onError: (message: string) => void;
}

/**
 * Allows a user to upload a song by either clicking the area to
 * open the file browser or dropping it onto it.
 */
const UploadImage: FunctionComponent<UploadImageProps> = ({ onError }) => {
  /**
   * Validates the image and then updates the
   * local state with the file if valid.
   */
  const handleDrop = useCallback(() => {
    try {
      // select song logic here
    } catch (error) {
      if (error instanceof Error) {
        onError(error.message);
      }
    }
  }, [onError]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    // TODO: only allow uncompressed file types
    accept: "audio/*",
  });

  return (
    <Box
      { ...getRootProps() }
      sx={ { display: "flex", flexGrow: 1, height: 100, cursor: "pointer" } }
    >
      <input { ...getInputProps() } />

      <DashedOutline sx={ { display: "flex", flexGrow: 1 } }>
        <IconMessage
          icon={ <AddSongIcon /> }
          message="Placeholder add song content"
        />
      </DashedOutline>
    </Box>
  );
};

export default UploadImage;
