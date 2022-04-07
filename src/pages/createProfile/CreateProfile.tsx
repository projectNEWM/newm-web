import { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
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
          <Switch>
            <Redirect
              exact
              to={ `${path}/what-should-we-call-you` }
              from={ `${path}` }
            />

            <Route exact path={ `${path}/what-should-we-call-you` }>
              { /** <PlaceholderCreatProfileName /> */ }
            </Route>
            <Route exact path={ `${path}/what-is-your-role` }>
              { /** <PlaceholderCreatProfileRole /> */ }
            </Route>
            <Route exact path={ `${path}/what-is-your-genre` }>
              { /** <PlaceholderCreatProfileGenre /> */ }
            </Route>
            <Route exact path={ `${path}/complete` }>
              { /** <PlaceholderCreatProfileComplete /> */ }
            </Route>
          </Switch>
        </Form>
      ) }
    </Formik>
  );
};

export default CreateProfile;
