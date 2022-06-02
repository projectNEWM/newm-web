import { Box, Stack } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import AddSongIcon from "assets/images/AddSong";
import CheckCircleIcon from "assets/images/CheckCircle";
import DashedOutline from "./styled/DashedOutline";
import IconMessage from "./IconMessage";
import ErrorMessage from "./styled/ErrorMessage";
import SolidOutline from "./styled/SolidOutline";

interface UploadSongProps {
  readonly file: File;
  readonly onChange: (file: File) => void;
  readonly onError: (message: string) => void;
  readonly onBlur: VoidFunction;
  readonly errorMessage?: string;
}

/**
 * Allows a user to upload a song by either clicking the area to
 * open the file browser or dropping it onto it.
 */
const UploadSong: FunctionComponent<UploadSongProps> = ({
  file,
  onChange,
  onError,
  onBlur,
  errorMessage,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleDrop = useCallback(
    async (
      acceptedFiles: ReadonlyArray<File>,
      fileRejections: ReadonlyArray<FileRejection>
    ) => {
      try {
        fileRejections.forEach((rejection) => {
          rejection.errors.forEach((error) => {
            if (error.message === "File type must be audio/*") {
              throw new Error("Please select an audio file.");
            } else {
              throw new Error("There was an error selecting your file.");
            }
          });
        });

        const firstFile = acceptedFiles[0];

        onChange(firstFile);
        onError("");
        onBlur();
      } catch (error) {
        if (error instanceof Error && onError) {
          onError(error.message);
        }
      }
    },
    [onChange, onError, onBlur]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    // TODO: only allow uncompressed file types
    accept: "audio/*",
  });

  return (
    <Stack direction="column" spacing={ 1 }>
      <Box
        { ...getRootProps() }
        sx={ {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: 100,
          cursor: "pointer",
        } }
      >
        <input { ...getInputProps() } />

        { file ? (
          <SolidOutline
            onMouseEnter={ () => setIsHovering(true) }
            onMouseLeave={ () => setIsHovering(false) }
            sx={ {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            } }
          >
            { isHovering || isDragActive ? (
              <IconMessage icon={ <AddSongIcon /> } message="Upload a new song" />
            ) : (
              <IconMessage icon={ <CheckCircleIcon /> } message={ file.name } />
            ) }
          </SolidOutline>
        ) : (
          <DashedOutline sx={ { display: "flex", flexGrow: 1 } }>
            <IconMessage
              icon={ <AddSongIcon /> }
              message="Drag and drop or browse your song"
            />
          </DashedOutline>
        ) }
      </Box>

      { !!errorMessage && (
        <ErrorMessage align="center">{ errorMessage }</ErrorMessage>
      ) }
    </Stack>
  );
};

export default UploadSong;
