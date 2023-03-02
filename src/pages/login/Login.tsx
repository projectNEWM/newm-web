import { Container, Stack, useTheme } from "@mui/material";
import { Button, HorizontalLine, Link, Typography } from "elements";
import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { commonYupValidation, useAuthenticatedRedirect } from "common";
import { history } from "common/history";
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

  useAuthenticatedRedirect();

  return (
    <Container
      maxWidth={ false }
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      } }
    >
      <Stack
        sx={ { alignItems: "center", gap: 1, mt: [2, 4, 5], width: "100%" } }
      >
        <Button
          onClick={ () => {
            history.push("/sign-up");
          } }
          sx={ { alignSelf: "flex-end", mr: [1, 1, 2] } }
          variant="secondary"
          width="compact"
        >
          Create an account
        </Button>
        <ResponsiveNEWMLogo />
      </Stack>

      <Typography variant="h1" sx={ { mt: [5.5, 5.5, 7.5] } }>
        Welcome back
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
              mt={ 3 }
              spacing={ 1.5 }
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

              <Button disabled={ !isValid || isSubmitting } type="submit">
                Log In
              </Button>
              <Link
                color="grey100"
                sx={ { textDecoration: "none" } }
                to="/forgot-password"
                variant="subtitle1"
                mt={ 0.5 }
              >
                Forgot password?
              </Link>
            </Stack>
          </Form>
        ) }
      </Formik>

      <Stack
        alignItems="center"
        columnGap={ 2 }
        direction="row"
        maxWidth={ theme.inputField.maxWidth }
        mt={ 3 }
        width="100%"
      >
        <HorizontalLine />
        <Typography>or</Typography>
        <HorizontalLine />
      </Stack>

      <Stack my={ 2 } spacing={ 2 } width="100%" alignItems="center">
        <GoogleLogin>Continue with Google</GoogleLogin>
        <FacebookLogin>Continue with Facebook</FacebookLogin>
        <LinkedInLogin>Continue with Linkedin</LinkedInLogin>
      </Stack>
    </Container>
  );
};

export default Login;
