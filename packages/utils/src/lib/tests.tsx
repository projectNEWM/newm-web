import { Form, Formik, FormikConfig } from "formik";
import { ReactNode } from "react";
import { StringMap } from "./types";

export const withFormik = (
  element: ReactNode,
  props: FormikConfig<StringMap>
) => {
  return (
    <Formik {...props}>
      <Form>{element}</Form>
    </Formik>
  );
};
