import { FunctionComponent } from "react";
import { Formik } from "formik";
import { Box, Container } from "@mui/material";
import { FullWidthForm } from "components";
import { useSelector } from "react-redux";
import { selectRole } from "modules/role";
import { Navigate, Route, Routes } from "react-router-dom";
import * as Yup from "yup";
import { Typography } from "elements";
import SelectRole from "./createProfileSteps/SelectRole";

export interface ProfileFormValues {
  readonly role: string;
}

const CreateProfile: FunctionComponent = () => {
  const { roles } = useSelector(selectRole);

  const initialValues: ProfileFormValues = {
    role: "",
  };

  const ValidationSchema = Yup.object().shape({
    role: Yup.string()
      .required("This field is required")
      .test(
        "is-role",
        "You need to type or select one of the ones below",
        (value) => (value ? roles.includes(value) : false)
      ),
  });

  const handleSubmit = () => {
    // logic to submit form data here
  };

  return (
    <Box
      px={ 2 }
      pt={ 10 }
      sx={ {
        display: "flex",
        flex: 1,
        maxWidth: "100%",
        backgroundColor: "black",
      } }
    >
      <Container maxWidth="lg">
        <Formik
          initialValues={ initialValues }
          validationSchema={ ValidationSchema }
          onSubmit={ handleSubmit }
          validateOnMount={ true }
        >
          { () => (
            <FullWidthForm>
              <Routes>
                <Route
                  path=""
                  element={ <Navigate to={ "what-should-we-call-you" } replace /> }
                />

                <Route
                  path={ "what-should-we-call-you" }
                  element={ <Typography>What Should we call you?</Typography> }
                />
                <Route path={ "what-is-your-role" } element={ <SelectRole /> } />
                <Route
                  path={ "what-is-your-genre" }
                  element={ <Typography>What is your genre?</Typography> }
                />
                <Route
                  path={ "complete" }
                  element={ <Typography>Complete </Typography> }
                />
              </Routes>
            </FullWidthForm>
          ) }
        </Formik>
      </Container>
    </Box>
  );
};

export default CreateProfile;
