import { Box, BoxProps, Stack } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { validateImageDimensions } from "common";
import { useTheme } from "@mui/material/styles";
import { FileRejection, useDropzone } from "react-dropzone";
import AddImageIcon from "assets/images/AddImage";
import CheckCircleIcon from "assets/images/CheckCircle";
import SolidOutline from "./styled/SolidOutline";
import DashedOutline from "./styled/DashedOutline";
import IconMessage from "./IconMessage";
import ErrorMessage from "./styled/ErrorMessage";

export interface FileWithPreview extends File {
  readonly preview: string;
}

interface UploadImageProps {
  readonly file?: FileWithPreview;
  readonly onChange: (file: FileWithPreview) => void;
  readonly onError: (message: string) => void;
  readonly onBlur: VoidFunction;
  readonly errorMessage?: string;
}

interface ImagePreviewProps extends BoxProps {
  readonly imageUrl: string;
}

/**
 * Allows a user to upload an image by either clicking the area to
 * open the file browser or dropping a file onto it.
 */
const UploadImage: FunctionComponent<UploadImageProps> = ({
  file,
  onChange,
  onBlur,
  onError,
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

        onChange(fileWithPreview);
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
    accept: "image/*",
  });

  /**
   * Revokes the data uri when the component unmounts
   * to avoid memory leaks (as per react-dropzone docs).
   */
  useEffect(() => {
    const handleLoad = () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };

    return handleLoad;
  }, [file]);

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
          <ImagePreview
            onMouseEnter={ () => setIsHovering(true) }
            onMouseLeave={ () => setIsHovering(false) }
            imageUrl={ file.preview }
          >
            { isHovering || isDragActive ? (
              <IconMessage
                icon={ <AddImageIcon /> }
                message="Upload a new image"
              />
            ) : (
              <IconMessage icon={ <CheckCircleIcon /> } message={ file.name } />
            ) }
          </ImagePreview>
        ) : (
          <DashedOutline sx={ { display: "flex", flexGrow: 1 } }>
            <IconMessage
              icon={ <AddImageIcon /> }
              message="Drag and drop or browse your image"
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

/**
 * Displays a background image with a dark overlay.
 */
const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
  imageUrl,
  children,
  sx,
  ...boxProps
}) => {
  const overlay = "rgba(0, 0, 0, 0.4)";

  return (
    <SolidOutline
      sx={ {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        background: `linear-gradient(0deg, ${overlay}, ${overlay}), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...sx,
      } }
      { ...boxProps }
    >
      { children }
    </SolidOutline>
  );
};

export default UploadImage;
