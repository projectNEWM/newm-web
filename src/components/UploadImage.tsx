import { BoxProps, Stack } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { validateImageDimensions } from "common";
import { SxProps, useTheme } from "@mui/material/styles";
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

export interface UploadImageProps {
  readonly file?: FileWithPreview;
  readonly onChange: (file: FileWithPreview) => void;
  readonly onError: (message: string) => void;
  readonly onBlur: VoidFunction;
  readonly minDimensions?: {
    readonly width: number;
    readonly height: number;
  };
  readonly errorMessageLocation?: "inside" | "outside";
  readonly isDimensionLabelTruncated?: boolean;
  readonly message?: string;
  readonly errorMessage?: string;
  readonly isSuccessIconDisplayed?: boolean;
  readonly rootSx?: SxProps;
  readonly contentSx?: SxProps;
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
  message,
  errorMessage,
  minDimensions,
  errorMessageLocation = "outside",
  isDimensionLabelTruncated = false,
  isSuccessIconDisplayed = true,
  rootSx = {},
  contentSx = {},
}) => {
  const theme = useTheme();

  const [isHovering, setIsHovering] = useState(false);

  const minLabel = isDimensionLabelTruncated ? "Min" : "Minimum size";

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
        const fileWithPreview = Object.assign(firstFile, {
          preview: URL.createObjectURL(firstFile),
        });

        if (minDimensions) {
          await validateImageDimensions({
            imageUrl: fileWithPreview.preview,
            minWidth: minDimensions.width,
            minHeight: minDimensions.height,
          });
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
    [minDimensions, onChange, onBlur, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".webp"] },
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

  const internalErrorMessage =
    errorMessageLocation === "inside" && !!errorMessage
      ? errorMessage
      : undefined;

  const externalErrorMessage =
    errorMessageLocation === "outside" && !!errorMessage
      ? errorMessage
      : undefined;

  return (
    <Stack
      { ...getRootProps() }
      gap={ 1 }
      sx={ {
        display: "flex",
        flexDirection: "column",
        maxWidth: theme.inputField.maxWidth,
        cursor: "pointer",
        borderRadius: "4px",
        ...rootSx,
      } }
    >
      <input { ...getInputProps() } />

      { file ? (
        <ImagePreview
          onMouseEnter={ () => setIsHovering(true) }
          onMouseLeave={ () => setIsHovering(false) }
          imageUrl={ (file.preview || file) as string }
          sx={ { height: 100, ...contentSx } }
        >
          { isHovering || isDragActive ? (
            <IconMessage
              icon={ <AddImageIcon /> }
              message="Upload a new image"
              errorMessage={ internalErrorMessage }
            />
          ) : isSuccessIconDisplayed ? (
            <IconMessage
              icon={ <CheckCircleIcon /> }
              message={ file.name }
              errorMessage={ internalErrorMessage }
            />
          ) : null }
        </ImagePreview>
      ) : (
        <DashedOutline
          sx={ { display: "flex", flexGrow: 1, height: 100, ...contentSx } }
        >
          <IconMessage
            icon={ <AddImageIcon /> }
            message={ message }
            subtitle={
              minDimensions
                ? `${minLabel}: ${minDimensions.width}px x ${minDimensions.height}px`
                : undefined
            }
            errorMessage={ internalErrorMessage }
          />
        </DashedOutline>
      ) }

      { !!externalErrorMessage && (
        <ErrorMessage align="center">{ externalErrorMessage }</ErrorMessage>
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
