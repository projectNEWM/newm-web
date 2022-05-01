import { FormikValues } from "formik";
import { extendedApi as sessionApi } from "modules/session";

const sendVerificationEmail = (values:FormikValues) =>
  sessionApi.endpoints.sendVerificationEmail.initiate({ email: values.email });

export { sendVerificationEmail };
