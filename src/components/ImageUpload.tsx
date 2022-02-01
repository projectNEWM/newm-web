import { Box, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { StyledFilledButton, StyledPaperInput } from "./StyledComponents";

export const ImageUpload = () => {
  const [uploadedFilePublicId, setUploadedFilePublicId] = useState<string>();
  const onDrop = useCallback(acceptedFiles => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    acceptedFiles.forEach(async (acceptedFile: File) => {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append("upload_preset", String(process.env.REACT_APP_PUBLIC_CLOUDINARY_UPLOAD_PRESET));

      const response = await fetch(url, {
        body: formData,
        method: "post",
      });

      const data = await response.json();
      setUploadedFilePublicId(data.public_id);
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
      <div { ...getRootProps({ className: "dropzone" }) }>
        <div>
          <input { ...getInputProps() } />
          <StyledPaperInput
            sx={ {
              height: !isDragActive ? "38px" : "158px",
              width: "webkit-fill-available",
            } }
          >
            { isDragActive ? "Drop That Art" : " Drag & Drop (square image only)" }
          </StyledPaperInput>
          { !isDragActive ? (
            <Box sx={ { alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center" } }>
              <Typography variant="body1" align="center" color="primary" marginTop="30px" marginBottom="27px">
                OR
              </Typography>
              <StyledFilledButton sx={ { width: "164px" } }>Upload Image</StyledFilledButton>
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
        <Box sx={ { alignItems: "center", display: "flex", justifyContent: "center" } }>
          <Image
            format="png"
            cloudName={ process.env.REACT_APP_PUBLIC_CLOUDINARY_CLOUD_NAME }
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
