import { FunctionComponent } from "react";
import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from "formik";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface FormRoute {
  readonly path: string;
  readonly element: JSX.Element;
  readonly validationSchema?: Yup.AnySchema;
  readonly onSubmitStep?: (
    values: FormikValues,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

interface WizardFormProps extends FormikConfig<FormikValues> {
  readonly rootPath?: string;
  readonly routes: ReadonlyArray<FormRoute>;
}

/**
 * Wizard form component. Takes an array of route objects with a
 * path, element, and validation schema. Each element in the form
 * should have a button with a type of "submit" in order for the
 * navigation, validation, and submit functionality to work correctly.
 */
const WizardForm: FunctionComponent<WizardFormProps> = ({
  routes,
  onSubmit,
  rootPath = "",
  ...formikProps
}) => {
  const location = useLocation();

  const navigate = useNavigate();

  /**
   * Helper function to get full path name from route path.
   */
  const getPathname = ({ path }: FormRoute) => {
    if (path === "") {
      return `/${rootPath}`;
    }

    return `/${rootPath}/${path}`;
  };

  const currentIndex = routes.map(getPathname).indexOf(location.pathname);

  /**
   * Navigate to next form route.
   */
  const goForward = () => {
    const nextPath = currentIndex + 1;
    navigate(routes[nextPath].path);
  };

  /**
   * Returns a validation schema depending on what
   * the current route is.
   */
  const getValidationSchema = () => {
    return routes[currentIndex]?.validationSchema || Yup.object().shape({});
  };

  /**
   * Navigates to the next route in the form or submits the
   * form if it is the final route.
   */
  const handleSubmit = (
    values: FormikValues,
    helpers: FormikHelpers<FormikValues>
  ) => {
    const currentRoute = routes[currentIndex];
    const isLastRoute = currentIndex === routes.length - 1;

    if (currentRoute.onSubmitStep) {
      currentRoute.onSubmitStep(values, helpers);
    }

    if (isLastRoute) {
      onSubmit(values, helpers);
    } else {
      goForward();
    }
  };

  return (
    <Formik
      { ...formikProps }
      onSubmit={ handleSubmit }
      validationSchema={ getValidationSchema }
    >
      { () => (
        <Form style={ { height: "100%" } }>
          <Routes>
            { routes.map(({ path, element }) => (
              <Route key={ path } path={ path } element={ element } />
            )) }
          </Routes>
        </Form>
      ) }
    </Formik>
  );
};

export default WizardForm;
