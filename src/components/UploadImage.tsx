import { Box, Stack } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { validateImageDimensions } from "common";
import { FileRejection, useDropzone } from "react-dropzone";
import AddImageIcon from "assets/images/AddImage";
import CheckCircleIcon from "assets/images/CheckCircle";
import UploadOverlayContent from "./UploadOverlayContent";
import ImagePreview from "./ImagePreview";
import DashedOutline from "./styled/DashedOutline";

interface FileWithPreview extends File {
  readonly preview: string;
}

interface UploadImageProps {
  readonly onError: (message: string) => void;
}

/**
 * Allows a user to upload an image by either clicking the area to
 * open the file browser or dropping the file onto it.
 */
const UploadImage: FunctionComponent<UploadImageProps> = ({ onError }) => {
  const [file, setFile] = useState<FileWithPreview>();
  const [isHovering, setIsHovering] = useState(false);

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
          onError(error.message);
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
    <Box
      { ...getRootProps() }
      sx={ { display: "flex", flexGrow: 1, height: 100, cursor: "pointer" } }
    >
      <input { ...getInputProps() } />

      { file?.preview ? (
        <ImagePreview
          onMouseEnter={ () => setIsHovering(true) }
          onMouseLeave={ () => setIsHovering(false) }
          imageUrl={ file.preview }
        >
          <Stack
            spacing={ 1 }
            direction="column"
            flexGrow={ 1 }
            justifyContent="center"
            alignItems="center"
          >
            { isHovering || isDragActive ? (
              <UploadOverlayContent
                icon={ <AddImageIcon /> }
                message="Upload a new image"
              />
            ) : (
              <UploadOverlayContent
                icon={ <CheckCircleIcon /> }
                message={ file.name }
              />
            ) }
          </Stack>
        </ImagePreview>
      ) : (
        <DashedOutline sx={ { display: "flex", flexGrow: 1 } }>
          <UploadOverlayContent
            icon={ <AddImageIcon /> }
            message="Drag and drop or browse your image"
          />
        </DashedOutline>
      ) }
    </Box>
  );
};

export default UploadImage;
