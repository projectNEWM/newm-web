import { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { Route, useRouteMatch } from "react-router-dom";
import * as Yup from "yup";

interface FormValues {
  // form value definitions here (placeholder added to prevent linting error)
  readonly example: string;
}

const CreateProfile: FunctionComponent = () => {
  const { path } = useRouteMatch();

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
          <Route path={ `${path}/:what-should-we-call-you` }>
            { /** <PlaceholderSignUpNameComponent /> */ }
          </Route>
          <Route path={ `${path}/:what-is-your-role` }>
            { /** <PlaceholderSignUpRoleComponent /> */ }
          </Route>
          <Route path={ `${path}/:what-is-your-genre` }>
            { /** <PlaceholderSignUpGenreComponent /> */ }
          </Route>
          <Route path={ `${path}/:complete` }>
            { /** <PlaceholderSignUpCompleteComponent /> */ }
          </Route>
        </Form>
      ) }
    </Formik>
  );
};

export default CreateProfile;
