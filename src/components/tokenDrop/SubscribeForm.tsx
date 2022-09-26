import {  Stack } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { commonYupValidation } from "common";
import { FilledButton } from "elements";
import { TextInputField } from "components";

interface InitialFormValues {
  readonly email: string;
}

const SubscribeForm = () => {
  const handleSubmit = ({ email }: InitialFormValues) => {
    // Handle submit
  };

  return (
      <Formik
        onSubmit={ handleSubmit }
        initialValues={ { email: "" } }
        validationSchema={ Yup.object().shape({
          email: commonYupValidation.email,
        }) }
      >
        { ({ isValid }: FormikProps<FormikValues>) => (
          <Form>
            <Stack
              direction="row"
              spacing={ 1.5 }
              maxWidth="460px"
              mt={ 1.5 }
              mb={ 3.5 }
            >
              <TextInputField
                aria-label="Email input field"
                name="email"
                placeholder="Email address"
                type="email"
              />
              <FilledButton
                disabled={ !isValid }
                sx={ { maxHeight: "42px" } }
                type="submit"
              >
                Subscribe
              </FilledButton>
            </Stack>
          </Form>
        ) }
      </Formik>
  );
};

export default SubscribeForm;
