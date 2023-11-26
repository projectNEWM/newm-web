import { Box } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button, Typography } from '@newm.io/studio/elements';
import * as Yup from 'yup';
import theme from '@newm.io/theme';
import TextInputField from '../form/TextInputField';

export default {
  title: 'Form',
};

interface FormValues {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
};

/**
 * Validation schema using Yup
 */
const ExampleSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
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
    <Box maxWidth={theme.inputField.maxWidth}>
      <Box mb={2}>
        <Typography variant="h3">Example Form</Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={ExampleSchema}
        onSubmit={mockHandleSubmit}
      >
        {() => (
          <Form>
            <Box mb={2}>
              <TextInputField name="firstName" placeholder="First name" />
            </Box>

            <Box mb={2}>
              <TextInputField name="lastName" placeholder="Last name" />
            </Box>

            <Box mb={2}>
              <TextInputField name="email" placeholder="Email" />
            </Box>

            <Button width="compact" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
