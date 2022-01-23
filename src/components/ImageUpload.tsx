import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Field, FormikErrors, FormikTouched } from "formik";
import React from "react";
import { render } from "react-dom";
import { useDropzone } from "react-dropzone";
import { theme } from "./../theme/theme";
import { StyledPaperInput } from "./StyledComponents";

interface ImageUploadProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  errors: FormikErrors<{
    description: string;
    genre: string;
    imageFile: {
      name: null;
      size: null;
      type: null;
    };
  }>;
  touched: FormikTouched<{
    description: string;
    genre: string;
    imageFile: {
      name: null;
      size: null;
      type: null;
    };
    releaseDate: string;
    title: string;
    yourRole: string;
  }>;
}

export const ImageUpload = (props: ImageUploadProps) => {
  const { setFieldValue, errors, touched } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFieldValue("files", acceptedFiles);
    },
  });
  return (
    <Box>
      { }
      <div { ...getRootProps({ className: "dropzone" }) }>
        <input { ...getInputProps() } />
        <StyledPaperInput
          sx={ {
            width: "326px",
            height: "38px",
          } }
        >
          { " " }
          Drag & Drop{ " " }
        </StyledPaperInput>

        <Typography variant="body1" align="center" color="primary">
          OR
        </Typography>
        { isDragActive ? <p>Drop the files here ...</p> : <p>Drag n drop some files here, or click to select files</p> }
      </div>
    </Box>
  );
};
