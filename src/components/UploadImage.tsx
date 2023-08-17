import { Box, BoxProps, Stack } from "@mui/material";
import {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { validateImageDimensions } from "common";
import { SxProps, useTheme } from "@mui/material/styles";
import { FileRejection, useDropzone } from "react-dropzone";
import AddImageIcon from "assets/images/AddImage";
import CheckCircleIcon from "assets/images/CheckCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import PictureInPictureIcon from "@mui/icons-material/PictureInPictureAlt";
import { Button } from "elements";
import SolidOutline from "./styled/SolidOutline";
import DashedOutline from "./styled/DashedOutline";
import IconMessage from "./IconMessage";
import ErrorMessage from "./styled/ErrorMessage";
import Modal from "./Modal";

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
  readonly minimumSizeLabel?: string;
  readonly emptyMessage?: string;
  readonly replaceMessage?: string;
  readonly errorMessage?: string;
  readonly changeImageButtonText?: string;
  readonly isSuccessIconDisplayed?: boolean;
  readonly isMinimumSizeDisplayed?: boolean;
  readonly isMultiButtonLayout?: boolean;
  readonly rootSx?: SxProps;
  readonly contentSx?: SxProps;
  readonly allowImageChange?: boolean;
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
  emptyMessage = "Drag & drop to upload or browse",
  replaceMessage = "Upload a new image",
  errorMessage,
  minDimensions,
  errorMessageLocation = "outside",
  minimumSizeLabel = "Minimum size",
  changeImageButtonText = "Change image",
  isSuccessIconDisplayed = true,
  isMinimumSizeDisplayed = true,
  isMultiButtonLayout = false,
  rootSx = {},
  contentSx = {},
  allowImageChange = true,
}) => {
  const theme = useTheme();

  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenPreview: MouseEventHandler = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: allowImageChange ? handleDrop : undefined,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/jpg": [".jpg", ".jpeg"],
    },
  });

  const handleChangeImage = () => {
    open();
    setIsModalOpen(false);
  };

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
    <>
      <Modal isOpen={ isModalOpen } onClose={ () => setIsModalOpen(false) }>
        <Stack
          flex={ 1 }
          mx={ 3 }
          padding={ 3 }
          gap={ 3 }
          alignSelf="center"
          flexDirection="column"
          sx={ { backgroundColor: theme.colors.grey600 } }
        >
          <img
            src={ typeof file === "string" ? file : file?.preview }
            style={ { maxHeight: "72vh", maxWidth: "100%" } }
            alt="cover preview"
          />

          <Stack direction="row" gap={ 2 } justifyContent="flex-end">
            { allowImageChange ? (
              <Button
                width="compact"
                variant="secondary"
                color="music"
                onClick={ handleChangeImage }
              >
                { changeImageButtonText }
              </Button>
            ) : null }

            <Button width="compact" onClick={ () => setIsModalOpen(false) }>
              Done
            </Button>
          </Stack>
        </Stack>
      </Modal>

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
            { !isMultiButtonLayout && (isHovering || isDragActive) ? (
              <IconMessage
                icon={ <AddImageIcon /> }
                message={ replaceMessage }
                errorMessage={ internalErrorMessage }
              />
            ) : isHovering ? (
              <Box display="flex" justifyContent="space-between" flex={ 1 }>
                { allowImageChange ? (
                  <Box
                    display="flex"
                    flex={ 1 }
                    justifyContent="center"
                    alignItems="center"
                    sx={ {
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                      },
                    } }
                  >
                    <IconMessage
                      icon={ <ChangeCircleIcon /> }
                      message="Change cover"
                    />
                  </Box>
                ) : null }

                <Box
                  display="flex"
                  flex={ 1 }
                  justifyContent="center"
                  alignItems="center"
                  onClick={ handleOpenPreview }
                  sx={ {
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                    },
                  } }
                >
                  <IconMessage
                    icon={ <PictureInPictureIcon /> }
                    message="Preview"
                  />
                </Box>
              </Box>
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
              message={ emptyMessage }
              subtitle={
                isMinimumSizeDisplayed && minDimensions
                  ? `${minimumSizeLabel}: ${minDimensions.width}px x ${minDimensions.height}px`
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
    </>
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
        alignItems: "stretch",
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
