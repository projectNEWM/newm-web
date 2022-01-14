import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import { array, date, object, string } from "yup";
import DatePickerInput from "./DatePickerInput";
import MultiDropdown from "./MultiDropdown";
import { StyledFilledButton, StyledTextField } from "./StyledComponents";
import GenreData from "../data/GenreData";
import RoleData from "../data/RoleData";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: "grey",
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const initalValues = {
  genre: "",
  releaseDate: "",
  title: "",
  yourRole: "",
};

export default function SongUploadForm() {
  return (
    <Box sx={ { flexGrow: 1 } } height="522px" width="1062px">
      <Formik
        initialValues={ initalValues }
        validationSchema={ object({
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
              <Grid item xs={ 4 } sx={ { height: "391px" } }>
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
                  <Grid item sx={ { paddingLeft: "0px !important", paddingTop: "15px !important" } }>
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
                  <Grid item sx={ { paddingLeft: "0px !important", paddingTop: "15px !important" } }>
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
                      paddingTop: "15px !important",
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
            <Box sx={ { textAlign: "center" } } width="1062px">
              <StyledFilledButton
                type="submit"
                // sx={{ position: "absolute", left: "50%", right: "50px" }}
                variant="contained"
                disabled={ !isValid || !dirty }
              >
                Upload &amp; Mint
              </StyledFilledButton>
            </Box>
          </Form>
        ) }
      </Formik>
    </Box>
  );
}
