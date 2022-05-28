import { Typography } from "elements";
import { Box, Stack } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { validateImageDimensions } from "common/fileUtils";
import { FileRejection, useDropzone } from "react-dropzone";
import AddSongIcon from "assets/images/AddSong";
import CheckCircleIcon from "assets/images/CheckCircle";
import DashedOutline from "./styled/DashedOutline";
import SolidOutline from "./styled/SolidOutline";

interface FileWithPreview extends File {
  readonly preview: string;
}

interface ImagePreviewProps {
  readonly filename: string;
  readonly preview: string;
  readonly isDragActive: boolean;
}

/**
 * Allows a user to upload an image by either clicking the area to
 * open the file browser or dropping the file onto the upload area.
 */
const UploadImage: FunctionComponent = () => {
  const [file, setFile] = useState<FileWithPreview>();

  /**
   * Revokes the data uri to avoid memory
   * leaks (as per react-dropzone docs).
   */
  const handleLoad = useCallback(() => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
  }, [file]);

  /**
   * Validates the image and then updates the
   * local state with the file if valid.
   */
  const handleDrop = useCallback(
    async (
      acceptedFiles: ReadonlyArray<File>,
      fileRejections: ReadonlyArray<FileRejection>
    ) => {
      try {
        fileRejections.forEach((rejection) => {
          rejection.errors.forEach((error) => {
            if (error.message === "File type must be image/*") {
              throw new Error("Please select an image file.");
            } else {
              throw new Error("There was an error selecting your file.");
            }
          });
        });

        const firstFile = acceptedFiles[0];
        const fileWithPreview = Object.assign(firstFile, {
          preview: URL.createObjectURL(firstFile),
        });

        const hasValidDimensions = await validateImageDimensions(
          fileWithPreview.preview,
          2048,
          2048
        );

        if (!hasValidDimensions) {
          throw new Error(
            "Please upload an image with a height and width of least 2048 pixels."
          );
        }

        setFile(fileWithPreview);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: "image/*",
  });

  useEffect(() => {
    return handleLoad;
  }, [handleLoad]);

  return (
    <Box
      { ...getRootProps() }
      sx={ { display: "flex", flexGrow: 1, height: 100, cursor: "pointer" } }
    >
      <input { ...getInputProps() } />

      { file?.preview ? (
        <ImagePreview
          filename={ file.name }
          preview={ file.preview }
          isDragActive={ isDragActive }
        />
      ) : (
        <ImageDropInput />
      ) }
    </Box>
  );
};

/**
 * Area that the user can either click or drag an image onto.
 */
const ImageDropInput: FunctionComponent = () => {
  return (
    <DashedOutline sx={ { display: "flex", flexGrow: 1 } }>
      <Stack
        spacing={ 1 }
        direction="column"
        sx={ { flexGrow: 1, justifyContent: "center", alignItems: "center" } }
      >
        <AddSongIcon />

        <Typography variant="h5" textAlign="center" fontWeight="regular">
          Drag and drop or browse your file
        </Typography>
      </Stack>
    </DashedOutline>
  );
};

/**
 * Displays an image preview as well as the file name. Displays
 * a message to upload a new image when the user hovers over it.
 */
const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
  filename,
  preview,
  isDragActive,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const overlay = "rgba(0, 0, 0, 0.4)";

  return (
    <SolidOutline
      onMouseEnter={ () => setIsHovering(true) }
      onMouseLeave={ () => setIsHovering(false) }
      sx={ {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        background: `linear-gradient(0deg, ${overlay}, ${overlay}), url(${preview})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } }
    >
      <Stack
        spacing={ 1 }
        direction="column"
        sx={ { flexGrow: 1, justifyContent: "center", alignItems: "center" } }
      >
        { isHovering || isDragActive ? (
          <>
            <AddSongIcon />

            <Typography variant="h5" textAlign="center" fontWeight="regular">
              Upload a new image
            </Typography>
          </>
        ) : (
          <>
            <CheckCircleIcon />

            <Typography variant="h5" textAlign="center" fontWeight="regular">
              { filename }
            </Typography>
          </>
        ) }
      </Stack>
    </SolidOutline>
  );
};

export default UploadImage;
