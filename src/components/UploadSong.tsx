import { Box, Stack } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import AddSongIcon from "assets/images/AddSong";
import CheckCircleIcon from "assets/images/CheckCircle";
import IconMessage from "./IconMessage";
import DashedOutline from "./styled/DashedOutline";
import ErrorMessage from "./styled/ErrorMessage";
import SolidOutline from "./styled/SolidOutline";

interface UploadSongProps {
  readonly file?: File;
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
  const theme = useTheme();

  const [isHovering, setIsHovering] = useState(false);

  const handleDrop = useCallback(
    async (
      acceptedFiles: ReadonlyArray<File>,
      fileRejections: ReadonlyArray<FileRejection>
    ) => {
      try {
        fileRejections.forEach((rejection) => {
          rejection.errors.forEach((error) => {
            throw new Error(error.message);
          });
        });

        const firstFile = acceptedFiles[0];

        onChange(firstFile);
        onError("");
      } catch (error) {
        if (error instanceof Error) {
          onError(error.message);
        }
      } finally {
        onBlur();
      }
    },
    [onChange, onBlur, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: {
      audio: [".flac", ".fla", ".wav"],
    },
  });

  return (
    <Stack direction="column" spacing={ 1 } alignItems="center">
      <Box
        { ...getRootProps() }
        sx={ {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: 100,
          width: "100%",
          maxWidth: theme.inputField.maxWidth,
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
              <IconMessage
                icon={ <AddSongIcon /> }
                message="Upload a new song"
                subtitle=".flac, .fla, or .wav"
              />
            ) : (
              <IconMessage icon={ <CheckCircleIcon /> } message={ file.name } />
            ) }
          </SolidOutline>
        ) : (
          <DashedOutline sx={ { display: "flex", flexGrow: 1 } }>
            <IconMessage
              icon={ <AddSongIcon /> }
              message="Drag and drop or browse your song"
              subtitle=".flac, .fla, or .wav"
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
