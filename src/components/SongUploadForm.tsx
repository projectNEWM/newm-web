import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { array, date, object, string } from "yup";
import { DatePickerInput } from "./DatePickerInput";
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
  releaseDate: "",
  title: "",
  yourRole: "",
};

interface SongUploadFormProps {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
}

export const SongUploadForm = (props: SongUploadFormProps) => {
  return (
    <Box sx={ { flexGrow: 1 } } height="522px" width="1062px">
      <Formik
        initialValues={ initialValues }
        validationSchema={ object({
          description: string().required(),
          genre: array().required(),
          releaseDate: date().required(),
          title: string().required(),
          yourRole: array().required(),
        }) }
        onSubmit={ (values, formikHelpers) => {
          formikHelpers.resetForm();
        } }
      >
        { ({ errors, isValid, touched, dirty }) => (
          <Form>
            <Grid direction="row" container spacing={ 1 }>
              <Grid marginBottom={ 0 } paddingBottom={ 0 } sx={ { height: "404px" } } item xs={ 4 }>
                <Typography variant="formHeader">Add Your Next Big Hit</Typography>
                <Grid direction="column" container spacing={ 1 }>
                  <Grid
                    item
                    sx={ {
                      paddingLeft: "0px !important",
                      paddingTop: "25px !important",
                    } }
                  >
                    <Field
                      sx={ { width: "325px" } }
                      name="title"
                      size="small"
                      label="Title"
                      as={ StyledTextField }
                      variant="outlined"
                      error={ Boolean(errors.title) && Boolean(touched.title) }
                      // helperText={Boolean(touched.title) && errors.title}
                    />
                  </Grid>
                  <Grid item sx={ { paddingLeft: "0px !important", paddingTop: "16px !important" } }>
                    <Field
                      sx={ { width: "325px" } }
                      name="genre"
                      label="Genre"
                      options={ GenreData }
                      as={ MultiDropdown }
                      error={ Boolean(errors.genre) && Boolean(touched.genre) }
                      helperText={ Boolean(touched.genre) && errors.genre }
                    />
                  </Grid>
                  <Grid item sx={ { paddingLeft: "0px !important", paddingTop: "16px !important" } }>
                    <Field
                      sx={ { width: "325px" } }
                      name="yourRole"
                      label="Your Role"
                      options={ RoleData }
                      as={ MultiDropdown }
                      error={ Boolean(errors.yourRole) && Boolean(touched.yourRole) }
                      // helperText={ Boolean(touched.yourRole) && errors.yourRole }
                    />
                  </Grid>
                  <Grid
                    item
                    sx={ {
                      paddingLeft: "0px !important",
                      paddingTop: "16px !important",
                    } }
                  >
                    <Field
                      sx={ { width: "325px" } }
                      name="releaseDate"
                      label="Release Date"
                      size="small"
                      as={ DatePickerInput }
                      error={ Boolean(errors.releaseDate) && Boolean(touched.releaseDate) }
                      // helperText={ Boolean(touched.releaseDate) && errors.releaseDate }
                    />
                  </Grid>
                  <Grid
                    item
                    sx={ {
                      paddingLeft: "0px !important",
                      paddingTop: "16px !important",
                    } }
                  >
                    <Field
                      sx={ { height: "96px", width: "325px" } }
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
              <Grid item xs={ 4 } sx={ { height: "391px" } }>
                <Grid direction="column" container spacing={ 1 }>
                  <Grid item>
                    <Item>Item</Item>
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
              </Grid>
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
