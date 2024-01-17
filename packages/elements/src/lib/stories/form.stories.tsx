import * as Yup from "yup";
import theme from "@newm-web/theme";
import { Box, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import Button from "../Button";
import TextInputField from "../form/TextInputField";

export default {
  title: "Form",
};

interface FormValues {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
}

const initialValues: FormValues = {
  email: "",
  firstName: "",
  lastName: "",
};

/**
 * Validation schema using Yup
 */
const ExampleSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const mockHandleSubmit = (
  values: FormValues,
  actions: FormikHelpers<FormValues>
) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

export const Example = () => {
  return (
    <Box maxWidth={ theme.inputField.maxWidth }>
      <Box mb={ 2 }>
        <Typography variant="h3">Example Form</Typography>
      </Box>

      <Formik
        initialValues={ initialValues }
        validationSchema={ ExampleSchema }
        onSubmit={ mockHandleSubmit }
      >
        { () => (
          <Form>
            <Box mb={ 2 }>
              <TextInputField name="firstName" placeholder="First name" />
            </Box>

            <Box mb={ 2 }>
              <TextInputField name="lastName" placeholder="Last name" />
            </Box>

            <Box mb={ 2 }>
              <TextInputField name="email" placeholder="Email" />
            </Box>

            <Button type="submit" width="compact">
              Submit
            </Button>
          </Form>
        ) }
      </Formik>
    </Box>
  );
};
