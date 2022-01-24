import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { array, date, mixed, object, string } from "yup";
import { DatePickerInput } from "./DatePickerInput";
import { ImageUpload } from "./ImageUpload";
import { MultiDropdown } from "./MultiDropdown";
import { StyledFilledButton, StyledOutlinedButton, StyledTextArea, StyledTextField } from "./StyledComponents";
import GenreData from "../data/GenreData";
import RoleData from "../data/RoleData";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: "grey",
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const initialValues = {
  description: "",
  genre: "",
  imageFile: {
    name: null,
    size: null,
    type: null,
  },
  releaseDate: "",
  title: "",
  yourRole: "",
};

interface SongUploadFormProps {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
}

export const SongUploadForm = (props: SongUploadFormProps) => {
  return (
    <Box sx={ { flexGrow: 1 } }>
      <Formik
        initialValues={ initialValues }
        validationSchema={ object({
          description: string().required(),
          genre: array().required(),
          imageFile: mixed().required(),
          releaseDate: date().required(),
          title: string().required(),
          yourRole: array().required(),
        }) }
        onSubmit={ (values, formikHelpers) => {
          console.log({
            fileName: values.imageFile.name,
            size: `${values.imageFile.size} bytes`,
            type: values.imageFile.type,
          });
          formikHelpers.resetForm();
        } }
      >
        { ({ errors, isValid, touched, dirty, handleSubmit, setFieldValue }) => (
          <Form onSubmit={ handleSubmit }>
            <Grid direction="row" container maxWidth={ "1060px" }>
              <Grid item xs={ 12 } md={ 4 }>
                <Grid direction="column" rowSpacing="16px" container paddingLeft="26px">
                  <Typography paddingTop="16px" variant="formHeader">
                    Add Your Next Big Hit
                  </Typography>

                  <Grid
                    item
                    sx={ {
                      paddingTop: "0px",
                    } }
                  >
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="title"
                      size="small"
                      label="Title"
                      as={ StyledTextField }
                      variant="outlined"
                      error={ Boolean(errors.title) && Boolean(touched.title) }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="genre"
                      label="Genre"
                      options={ GenreData }
                      as={ MultiDropdown }
                      error={ Boolean(errors.genre) && Boolean(touched.genre) }
                      helperText={ Boolean(touched.genre) && errors.genre }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="yourRole"
                      label="Your Role"
                      options={ RoleData }
                      as={ MultiDropdown }
                      error={ Boolean(errors.yourRole) && Boolean(touched.yourRole) }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="releaseDate"
                      label="Release Date"
                      size="small"
                      as={ DatePickerInput }
                      error={ Boolean(errors.releaseDate) && Boolean(touched.releaseDate) }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { height: "96px", width: "-webkit-fill-available" } }
                      name="description"
                      label="Description / Tags / Credits"
                      as={ StyledTextArea }
                      multiline={ true }
                      rows={ 3 }
                      error={ Boolean(errors.description) && Boolean(touched.description) }
                    />
                  </Grid>
                </Grid>
              </Grid>
              { /* SECOND COLUMN */ }

              <Grid marginBottom={ 0 } paddingBottom={ 0 } sx={ {} } item xs={ 4 }>
                <Grid direction="column" rowSpacing="16px" container paddingLeft="16px">
                  <Typography paddingTop="16px" variant="formHeader">
                    Add Your Next Big Hit
                  </Typography>

                  <Grid
                    item
                    sx={ {
                      paddingTop: "0px",
                    } }
                  >
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="title"
                      size="small"
                      label="Title"
                      as={ StyledTextField }
                      variant="outlined"
                      error={ Boolean(errors.title) && Boolean(touched.title) }
                      // helperText={Boolean(touched.title) && errors.title}
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="genre"
                      label="Genre"
                      options={ GenreData }
                      as={ MultiDropdown }
                      error={ Boolean(errors.genre) && Boolean(touched.genre) }
                      helperText={ Boolean(touched.genre) && errors.genre }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      name="yourRole"
                      label="Your Role"
                      options={ RoleData }
                      as={ MultiDropdown }
                      error={ Boolean(errors.yourRole) && Boolean(touched.yourRole) }
                      // helperText={ Boolean(touched.yourRole) && errors.yourRole }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="releaseDate"
                      label="Release Date"
                      size="small"
                      as={ DatePickerInput }
                      error={ Boolean(errors.releaseDate) && Boolean(touched.releaseDate) }
                      // helperText={ Boolean(touched.releaseDate) && errors.releaseDate }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { height: "96px", width: "-webkit-fill-available" } }
                      name="description"
                      label="Description / Tags / Credits"
                      as={ StyledTextArea }
                      multiline={ true }
                      rows={ 3 }
                      error={ Boolean(errors.description) && Boolean(touched.description) }
                      // helperText={ Boolean(touched.releaseDate) && errors.releaseDate }
                    />
                  </Grid>
                </Grid>
              </Grid>
              { /* THIRD COLUMN */ }
              <Grid marginBottom={ 0 } paddingBottom={ 0 } sx={ { height: "404px" } } item xs={ 4 }>
                <Grid
                  direction="column"
                  rowSpacing="16px"
                  container
                  paddingLeft="16px"
                  paddingRight="25px"
                  marginRight="18px"
                >
                  <Typography paddingTop="16px" variant="formHeader">
                    Add Your Next Big Hit
                  </Typography>

                  <Grid
                    item
                    sx={ {
                      paddingTop: "0px",
                    } }
                  >
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="title"
                      size="small"
                      label="Title"
                      as={ StyledTextField }
                      variant="outlined"
                      error={ Boolean(errors.title) && Boolean(touched.title) }
                      // helperText={Boolean(touched.title) && errors.title}
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="genre"
                      label="Genre"
                      options={ GenreData }
                      as={ MultiDropdown }
                      error={ Boolean(errors.genre) && Boolean(touched.genre) }
                      helperText={ Boolean(touched.genre) && errors.genre }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="yourRole"
                      label="Your Role"
                      options={ RoleData }
                      as={ MultiDropdown }
                      error={ Boolean(errors.yourRole) && Boolean(touched.yourRole) }
                      // helperText={ Boolean(touched.yourRole) && errors.yourRole }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { width: "-webkit-fill-available" } }
                      name="releaseDate"
                      label="Release Date"
                      size="small"
                      as={ DatePickerInput }
                      error={ Boolean(errors.releaseDate) && Boolean(touched.releaseDate) }
                      // helperText={ Boolean(touched.releaseDate) && errors.releaseDate }
                    />
                  </Grid>
                  <Grid item sx={ {} }>
                    <Field
                      sx={ { height: "96px", width: "-webkit-fill-available" } }
                      name="description"
                      label="Description / Tags / Credits"
                      as={ StyledTextArea }
                      multiline={ true }
                      rows={ 3 }
                      error={ Boolean(errors.description) && Boolean(touched.description) }
                      // helperText={ Boolean(touched.releaseDate) && errors.releaseDate }
                    />
                  </Grid>
                </Grid>
              </Grid>

              { /* SECOND COLUMN */ }
              { /* <Grid item xs={ 4 } sx={ { height: "391px", paddingLeft: "0px" } }>
                <Typography variant="formHeader">Add Your Album Art </Typography>
                <Grid direction="column" container spacing={ 1 }>
                  <Grid
                    item
                    sx={ {
                      paddingTop: "25px !important",
                    } }
                  >
                    <ImageUpload errors={ errors } touched={ touched } setFieldValue={ setFieldValue } />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={ 4 } sx={ { height: "391px" } }>
                <Grid direction="column" container spacing={ 1 }>
                  <Grid item>
                    <Item>Item</Item>
                  </Grid>
                  <Grid item>
                    <Item>Item</Item>
                  </Grid>
                </Grid>
              </Grid> */ }
            </Grid>
            <Box sx={ { paddingTop: "0px", textAlign: "center" } } width="1062px">
              <StyledOutlinedButton
                onClick={ () => {
                  props.setOpenPopup(false);
                } }
                sx={ { marginRight: "15px", width: "164px" } }
                variant="outlined"
              >
                Cancel
              </StyledOutlinedButton>
              <StyledFilledButton
                sx={ { marginRight: "15px", width: "164px" } }
                type="submit"
                variant="contained"
                disabled={ !isValid || !dirty }
              >
                Upload
              </StyledFilledButton>
              <StyledFilledButton
                sx={ { width: "164px" } }
                type="submit"
                variant="contained"
                disabled={ !isValid || !dirty }
              >
                Mint
              </StyledFilledButton>
            </Box>
          </Form>
        ) }
      </Formik>
    </Box>
  );
};
