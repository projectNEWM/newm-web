import { Grid, Typography, Paper, Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import TextInput from "./TextInput";
import { Field, Form, Formik } from "formik";
import { object, string, array } from "yup";
import { TextField, Button } from "@mui/material";
import GenreDropdown from "./GenreDropdown";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "grey",
}));

const initalValues = {
  title: "",
  name: "",
  password: "",
};

export default function SongUploadForm(props) {
  return (
    <Box sx={{ flexGrow: 1 }} height="522px" width="1062px">
      <Formik
        initialValues={initalValues}
        validationSchema={object({
          title: string().required(),
          genre: array().required(),
        })}
        onSubmit={(values, formikHelpers) => {
          console.log(values);
          formikHelpers.resetForm();
        }}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <Grid direction="row" container spacing={1}>
              <Grid item xs={4} sx={{ height: "391px" }}>
                <Typography variant="formHeader">
                  Add Your Next Big Hit
                </Typography>
                <Grid direction="column" container spacing={1}>
                  <Grid item sx={{ marginTop: "25px", marginBottom: "16px" }}>
                    <Field
                      sx={{ width: "325px" }}
                      id="title"
                      name="title"
                      size="small"
                      label="Title"
                      as={StyledTextField}
                      variant="outlined"
                      error={Boolean(errors.title) && Boolean(touched.title)}
                      // helperText={Boolean(touched.title) && errors.title}
                    />
                  </Grid>
                  <Grid item sx={{}}>
                    <Field
                      sx={{ width: "325px" }}
                      name="genre"
                      id="genre"
                      as={GenreDropdown}
                      error={Boolean(errors.genre) && Boolean(touched.genre)}
                      helperText={Boolean(touched.genre) && errors.genre}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sx={{ height: "391px" }}>
                <Grid direction="column" container spacing={1}>
                  <Grid item>
                    <Item>Item</Item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sx={{ height: "391px" }}>
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
            <Box sx={{ textAlign: "center" }} width="1062px">
              <StyledFilledButton
                type="submit"
                // sx={{ position: "absolute", left: "50%", right: "50px" }}
                variant="contained"
                disabled={!isValid || !dirty}
              >
                Upload & Mint
              </StyledFilledButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

const StyledTextField = styled(TextField)({
  minWidth: "100px",
  height: "38px",
  border: "1px solid #2F2F2F",
  borderRadius: "9px",
  opacity: 1,
  backgroundColor: "#151515",
  boxShadow: "inset 0px 3px 6px #000000D0",
});

const StyledFilledButton = styled(Button)({
  background:
    "transparent linear-gradient(180deg, #CC33CC 0%, #333399 100%) 0% 0% no-repeat padding-box;",
  borderRadius: "7px",
  color: "white",
  font: "normal normal bold 14px/30px Raleway",
});
