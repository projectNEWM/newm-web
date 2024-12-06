import { Box, BoxProps, Stack } from "@mui/material";
import {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  validateAspectRatioOneToOne,
  validateMinImageDimensions,
} from "@newm-web/utils";
import { SxProps, useTheme } from "@mui/material/styles";
import { FileRejection, useDropzone } from "react-dropzone";
import { AddImage, CheckCircle } from "@newm-web/assets";
import ChangeCircle from "@mui/icons-material/ChangeCircle";
import PictureInPictureIcon from "@mui/icons-material/PictureInPictureAlt";
import Button from "./Button";
import SolidOutline from "./styled/SolidOutline";
import DashedOutline from "./styled/DashedOutline";
import IconMessage from "./IconMessage";
import ErrorMessage from "./styled/ErrorMessage";
import Modal from "./Modal";

export interface FileWithPreview extends File {
  readonly preview: string;
}

export interface UploadImageProps {
  readonly allowImageChange?: boolean;
  readonly changeImageButtonText?: string;
  readonly contentSx?: SxProps;
  readonly emptyMessage?: string;
  readonly errorMessage?: string;
  readonly errorMessageLocation?: "inside" | "outside";
  readonly file?: FileWithPreview;
  readonly hasPreviewOption?: boolean;
  readonly isAspectRatioOneToOne?: boolean;
  readonly isMinimumSizeDisplayed?: boolean;
  readonly isSuccessIconDisplayed?: boolean;
  readonly maxFileSizeMB?: number;
  readonly minDimensions?: {
    readonly height: number;
    readonly width: number;
  };
  readonly minFileSizeMB?: number;
  readonly minimumSizeLabel?: string;
  readonly onBlur: VoidFunction;
  readonly onChange: (file: FileWithPreview) => void;
  readonly onError: (message: string) => void;
  readonly replaceMessage?: string;
  readonly rootSx?: SxProps;
}

interface ImagePreviewProps extends BoxProps {
  readonly hasPersistentOverlay?: boolean;
  readonly imageUrl: string;
}

/**
 * Allows a user to upload an image by either clicking the area to
 * open the file browser or dropping a file onto it.
 */
const UploadImage: FunctionComponent<UploadImageProps> = ({
  allowImageChange = true,
  changeImageButtonText = "Change image",
  contentSx = {},
  emptyMessage = "Drag & drop to upload or browse",
  errorMessage,
  errorMessageLocation = "outside",
  file,
  isAspectRatioOneToOne = false,
  isMinimumSizeDisplayed = true,
  hasPreviewOption = false,
  isSuccessIconDisplayed = true,
  maxFileSizeMB,
  minFileSizeMB,
  minDimensions,
  minimumSizeLabel = "Minimum size",
  onBlur,
  onChange,
  onError,
  replaceMessage = "Upload a new image",
  rootSx = {},
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

        if (maxFileSizeMB && firstFile.size > maxFileSizeMB * 1000 * 1000) {
          throw new Error(
            `Image must be less than or equal to ${maxFileSizeMB}MB`
          );
        }

        if (minFileSizeMB && firstFile.size < minFileSizeMB * 1000 * 1000) {
          throw new Error(
            `Image must be greater than or equal to ${minFileSizeMB * 1000}KB`
          );
        }

        const fileWithPreview = Object.assign(firstFile, {
          preview: URL.createObjectURL(firstFile),
        });

        if (isAspectRatioOneToOne) {
          await validateAspectRatioOneToOne(fileWithPreview.preview);
        }

        if (minDimensions) {
          await validateMinImageDimensions({
            imageUrl: fileWithPreview.preview,
            minHeight: minDimensions.height,
            minWidth: minDimensions.width,
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
    [
      maxFileSizeMB,
      minFileSizeMB,
      isAspectRatioOneToOne,
      minDimensions,
      onChange,
      onError,
      onBlur,
    ]
  );

  const handleOpenPreview: MouseEventHandler = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "image/jpg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    multiple: false,
    onDrop: allowImageChange ? handleDrop : undefined,
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
          alignSelf="center"
          flex={ 1 }
          flexDirection="column"
          gap={ 3 }
          mx={ 3 }
          padding={ 3 }
          sx={ { backgroundColor: theme.colors.grey600 } }
        >
          <img
            alt="cover preview"
            src={ typeof file === "string" ? file : file?.preview }
            style={ { maxHeight: "72vh", maxWidth: "100%" } }
          />

          <Stack direction="row" gap={ 2 } justifyContent="flex-end">
            { allowImageChange ? (
              <Button
                color="music"
                variant="secondary"
                width="compact"
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
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          maxWidth: theme.inputField.maxWidth,
          ...rootSx,
        } }
      >
        <input { ...getInputProps() } />

        { file ? (
          <ImagePreview
            hasPersistentOverlay={ hasPreviewOption }
            imageUrl={ (file.preview || file) as string }
            sx={ { height: 100, ...contentSx } }
            onMouseEnter={ () => setIsHovering(true) }
            onMouseLeave={ () => setIsHovering(false) }
          >
            { !hasPreviewOption && (isHovering || isDragActive) ? (
              <IconMessage
                errorMessage={ internalErrorMessage }
                icon={ <AddImage /> }
                message={ replaceMessage }
              />
            ) : isHovering ? (
              <Box display="flex" flex={ 1 } justifyContent="space-between">
                { allowImageChange ? (
                  <Box
                    alignItems="center"
                    display="flex"
                    flex={ 1 }
                    justifyContent="center"
                    sx={ {
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                      },
                    } }
                  >
                    <IconMessage
                      icon={ <ChangeCircle /> }
                      message="Change cover"
                    />
                  </Box>
                ) : null }

                <Box
                  alignItems="center"
                  display="flex"
                  flex={ 1 }
                  justifyContent="center"
                  sx={ {
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                    },
                  } }
                  onClick={ handleOpenPreview }
                >
                  <IconMessage
                    icon={ <PictureInPictureIcon /> }
                    message="Preview"
                  />
                </Box>
              </Box>
            ) : isSuccessIconDisplayed ? (
              <IconMessage
                errorMessage={ internalErrorMessage }
                icon={ <CheckCircle fill={ theme.colors.green } /> }
                message={ file.name }
              />
            ) : null }
          </ImagePreview>
        ) : (
          <DashedOutline
            sx={ { display: "flex", flexGrow: 1, height: 100, ...contentSx } }
          >
            <IconMessage
              errorMessage={ internalErrorMessage }
              icon={ <AddImage /> }
              message={ emptyMessage }
              subtitle={
                isMinimumSizeDisplayed && minDimensions
                  ? `${minimumSizeLabel}: ${minDimensions.width}px x ${minDimensions.height}px`
                  : undefined
              }
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
 * Displays a background image. A persistent overlay is added for multi button
 * layouts and a hover overlay is added for single button layouts.
 */
const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
  hasPersistentOverlay = false,
  imageUrl,
  children,
  sx,
  ...boxProps
}) => {
  const overlay = "rgba(0, 0, 0, 0.4)";

  return (
    <SolidOutline
      sx={ {
        "&:hover": !hasPersistentOverlay
          ? {
              backgroundImage: `linear-gradient(0deg, ${overlay}, ${overlay}), url(${imageUrl})`,
            }
          : null,
        alignItems: "stretch",
        background: hasPersistentOverlay
          ? `linear-gradient(0deg, ${overlay}, ${overlay}), url(${imageUrl})`
          : `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        flexGrow: 1,

        justifyContent: "center",
        ...sx,
      } }
      { ...boxProps }
    >
      { children }
    </SolidOutline>
  );
};

export default UploadImage;
