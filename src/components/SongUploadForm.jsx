import { Grid, Typography, Paper, Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import TextInput from "./TextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "grey",
}));

const StyledTextField = styled(TextField)({
  width: "325px",
  minWidth:"100px",
  height: "38px",
  marginTop: "25px",
  border: "1px solid #1D1D1D !important",
  borderRadius: 4,
  backgroundColor: "#121212",
});

export default function SongUploadForm(props) {
  return (
    <Box sx={{ flexGrow: 1 }} height="522px" width="1062px">
      <Grid direction="row" container spacing={1}>
        <Grid item xs={4}>
          <Typography variant="formHeader">Add Your Next Big Hit</Typography>
          <Grid direction="column" container spacing={1}>
            <Grid item>
              <StyledTextField
                color="primary"
                size="small"
                id="outlined-basic"
                align="left"
                label="Title"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid direction="column" container spacing={1}>
            <Grid item>
              <Item>Item</Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid direction="column" container spacing={1}>
            <Grid item>
              <Item>Item</Item>
            </Grid>
            <Grid item>
              <Item>Item</Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
