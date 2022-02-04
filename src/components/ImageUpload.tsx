import { Box, CircularProgress, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { StyledFilledButton, StyledPaperInput } from "./StyledComponents";

// once we have backend authentication we will need to protect these variables
const PUBLIC_CLOUDINARY_CLOUD_NAME = "projectnewm",
  PUBLIC_CLOUDINARY_UPLOAD_PRESET = "rvktckuk";

interface ImageUploadProps {
  fileType?: "png" | "jpg" | "jpeg" | "wdp" | "jp2" | "bmp" | "pdf" | "tiff" | "ico" | "eps";
  dropzoneLabel?: string;
  buttonLabel?: string;
}

export const ImageUpload = ({
  fileType = "png",
  dropzoneLabel = "Drag & Drop (Square Image Only)",
  buttonLabel = "Upload Image",
}: ImageUploadProps) => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [uploadedFilePublicId, setUploadedFilePublicId] = useState<string>();
  const onDrop = useCallback(acceptedFiles => {
    const url = `https://api.cloudinary.com/v1_1/${PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    acceptedFiles.forEach(async (acceptedFile: File) => {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append("upload_preset", String(PUBLIC_CLOUDINARY_UPLOAD_PRESET));

      const response = await fetch(url, {
        body: formData,
        method: "post",
      });

      const data = await response.json();
      setUploadedFilePublicId(data.public_id);
      setImgLoaded(false);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop,
  });
  let render = <div />;
  if (!uploadedFilePublicId) {
    render = (
      <div data-testid="dropzone" { ...getRootProps({ className: "dropzone" }) }>
        <div>
          <input { ...getInputProps() } />
          <StyledPaperInput
            data-testid="paper-dropzone"
            sx={ {
              height: !isDragActive ? "38px" : "158px",
              width: "webkit-fill-available",
            } }
          >
            { isDragActive ? "Drop That Art" : dropzoneLabel }
          </StyledPaperInput>
          { !isDragActive ? (
            <Box sx={ { alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center" } }>
              <Typography variant="body1" align="center" color="primary" marginTop="30px" marginBottom="27px">
                OR
              </Typography>
              <StyledFilledButton sx={ { width: "164px" } }>{ buttonLabel }</StyledFilledButton>
            </Box>
          ) : (
            ""
          ) }
        </div>
      </div>
    );
  } else {
    render = (
      <div { ...getRootProps({ className: "dropzone" }) }>
        <input { ...getInputProps() } />
        <Box
          sx={ {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            minHeight: !imgLoaded ? "150px" : "",
          } }
        >
          { !imgLoaded ? (
            <div data-testid="loadingIcon">
              <CircularProgress />
            </div>
          ) : (
            ""
          ) }

          <Image
            data-testid="uploadedImage"
            style={ imgLoaded ? { display: "" } : { display: "none" } }
            onLoad={ () => {
              setImgLoaded(true);
            } }
            format={ fileType }
            cloudName={ PUBLIC_CLOUDINARY_CLOUD_NAME }
            publicId={ uploadedFilePublicId }
            height="145"
            radius="max"
            width="145"
          />
        </Box>
      </div>
    );
  }

  return render;
};

// interface ImageUploadProps {
//   setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
//   errors: FormikErrors<{
//     description: string;
//     genre: string;
//     imageFile: {
//       name: string;
//       size: string;
//       type: string;
//     };
//   }>;
//   touched: FormikTouched<{
//     description: string;
//     genre: string;
//     imageFile: {
//       name: string;
//       size: null;
//       type: string;
//     };
//     releaseDate: string;
//     title: string;
//     yourRole: string;
//   }>;
// }
