import { Box, Stack, useTheme } from "@mui/material";
import { Button, HorizontalLine, Link, Typography } from "elements";
import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { commonYupValidation, useAuthenticatedRedirect } from "common";
import { Form, Formik, FormikValues } from "formik";
import {
  FacebookLogin,
  GoogleLogin,
  LinkedInLogin,
  PasswordInputField,
  ResponsiveNEWMLogo,
  TextInputField,
} from "components";
import * as Yup from "yup";
import { extendedApi as sessionApi } from "modules/session";

const Login: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [maskPassword, setMaskPassword] = useState(true);

  const validationSchema = Yup.object({
    email: commonYupValidation.email,
    password: commonYupValidation.password,
  });

  const togglePasswordMask = () => {
    setMaskPassword(!maskPassword);
  };

  const handleLogin = async ({ email, password }: FormikValues) => {
    await dispatch(sessionApi.endpoints.login.initiate({ email, password }));
  };

  const handleForgotPassword = () => {
    // eslint-disable-next-line no-console
    console.log("Insert reset password logic");
  };

  useAuthenticatedRedirect();

  return (
    <Box
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      } }
    >
      <Box sx={ { mt: [5, 5, 7.5] } }>
        <ResponsiveNEWMLogo />
      </Box>

      <Typography sx={ { mt: [5.5, 5.5, 7.5] } } variant="h3">
        Back to the music
      </Typography>
      <Formik
        initialValues={ { email: "", password: "" } }
        onSubmit={ handleLogin }
        validationSchema={ validationSchema }
      >
        { ({ isValid, values: { password }, isSubmitting }) => (
          <Form style={ { textAlign: "center", width: "100%" } }>
            <Stack
              display="inline-flex"
              maxWidth={ theme.inputField.maxWidth }
              mt={ 2.5 }
              spacing={ 2 }
              width="100%"
            >
              <TextInputField
                aria-label="Email input field"
                name="email"
                placeholder="Email"
                type="email"
              />
              <PasswordInputField
                aria-label="Password input field"
                externalMaskPassword={ maskPassword }
                handlePressEndAdornment={ togglePasswordMask }
                name="password"
                showEndAdornment={ !!password }
              />

              <Button
                disabled={ !isValid || isSubmitting }
                style={ { marginBottom: "20px" } }
                type="submit"
              >
                Log In
              </Button>
              <Button variant="outlined" onClick={ handleForgotPassword }>
                Forgot password?
              </Button>
              <Link to="/sign-up" style={ { marginBottom: "8px" } }>
                Create new account
              </Link>

              <HorizontalLine />
            </Stack>
          </Form>
        ) }
      </Formik>

      <Typography align="center" mt={ 2.5 }>
        Or continue with
      </Typography>

      <Stack direction="row" mt={ 2 } spacing={ 2 }>
        <GoogleLogin />
        <FacebookLogin />
        <LinkedInLogin />
      </Stack>
    </Box>
  );
};

export default Login;
