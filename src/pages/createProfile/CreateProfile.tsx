import { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { Navigate, Route, Routes } from "react-router-dom";
import * as Yup from "yup";
import { Typography } from "elements";

interface FormValues {
  // form value definitions here (placeholder added to prevent linting error)
  readonly example: string;
}

const CreateProfile: FunctionComponent = () => {
  const initialValues: FormValues = {
    // initial values here
    example: "",
  };

  const ValidationSchema = Yup.object().shape({});

  const handleSubmit = () => {
    // logic to submit form data here
  };

  return (
    <Formik
      initialValues={ initialValues }
      validationSchema={ ValidationSchema }
      onSubmit={ handleSubmit }
    >
      { () => (
        <Form>
          <Routes>
            <Route
              path=""
              element={ <Navigate to={ "what-should-we-call-you" } replace /> }
            />

            <Route
              path={ "what-should-we-call-you" }
              element={ <Typography>What Should we call you?</Typography> }
            />
            <Route
              path={ "what-is-your-role" }
              element={ <Typography>What is your role?</Typography> }
            />
            <Route
              path={ "what-is-your-genre" }
              element={ <Typography>What is your genre?</Typography> }
            />
            <Route
              path={ "complete" }
              element={ <Typography>Complete </Typography> }
            />
          </Routes>
        </Form>
      ) }
    </Formik>
  );
};

export default CreateProfile;
