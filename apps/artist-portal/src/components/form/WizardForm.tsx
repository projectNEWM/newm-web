import { FunctionComponent } from "react";
import { Form, Formik, FormikConfig, FormikHelpers, FormikValues } from "formik";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { removeTrailingSlash } from "@newm.io/studio/common";
import * as Yup from "yup";
import { FormProgressStepper } from "@newm.io/studio/components";

interface FormRoute {
  /** route corresponding to the step */
  readonly path: string;
  /** The component for the step */
  readonly element: JSX.Element;
  /** The validation schema for the step */
  readonly validationSchema?: Yup.AnySchema;
  /** True if form should navigate to next step, defaults to true */
  readonly navigateOnSubmitStep?: boolean;
  /** Called when the step is submitted */
  readonly onSubmitStep?: (
    values: any, // eslint-disable-line
    helpers: FormikHelpers<FormikValues>
  ) => void | Promise<void>;
  /** The route title for the progress stepper */
  readonly progressStepTitle?: string;
}

// eslint-disable-next-line
interface WizardFormProps extends FormikConfig<any> {
  readonly rootPath?: string;
  readonly routes: ReadonlyArray<FormRoute>;

  /** Display progress stepper at top of page */
  readonly isProgressStepperVisible?: boolean;
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
  isProgressStepperVisible,
  ...formikProps
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Helper function to get full path name from route path.
   */
  const getPathname = ({ path }: FormRoute) => {
    return removeTrailingSlash(`/${rootPath}/${path}`);
  };

  const currentIndex = routes.map(getPathname).indexOf(removeTrailingSlash(location.pathname));

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
   * Calls `onSubmitStep` if present. If this is the last route, it submits
   * the form, otherwise, it navigates if `navigateOnSubmitStep` is not false.
   */
  const handleSubmit = async (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
    const currentRoute = routes[currentIndex];
    const isLastRoute = currentIndex === routes.length - 1;
    const shouldNavigate = currentRoute.navigateOnSubmitStep ?? true;

    if (currentRoute.onSubmitStep) {
      await currentRoute.onSubmitStep(values, helpers);
    }

    if (isLastRoute) {
      await onSubmit(values, helpers);
      return;
    }

    // reset touched fields before navigating to next step
    helpers.setTouched({}, false);

    if (shouldNavigate) {
      goForward();
    }
  };

  return (
    <Formik { ...formikProps } onSubmit={ handleSubmit } validationSchema={ getValidationSchema }>
      { () => (
        <Form style={ { height: "100%" } } noValidate>
          { isProgressStepperVisible && (
            <FormProgressStepper
              activeStep={ currentIndex + 1 }
              stepTitles={ routes.map((route) => route.progressStepTitle) as string[] }
            />
          ) }

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
