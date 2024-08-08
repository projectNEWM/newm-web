import { Box, Stack, Typography, useTheme } from "@mui/material";
import {
  Button,
  HorizontalLine,
  Link,
  PasswordInputField,
  TextInputField,
} from "@newm-web/elements";
import { FunctionComponent, MouseEventHandler, useState } from "react";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { commonYupValidation, useAuthenticatedRedirect } from "../../common";
import { history } from "../../common/history";
import { AppleLogin, GoogleLogin, ResponsiveNEWMLogo } from "../../components";
import { useLoginThunk } from "../../modules/session";

const Login: FunctionComponent = () => {
  const theme = useTheme();

  const [login, { isLoading }] = useLoginThunk();
  const [maskPassword, setMaskPassword] = useState(true);

  const validationSchema = Yup.object({
    email: commonYupValidation.email,
    password: commonYupValidation.password,
  });

  const togglePasswordMask = () => {
    setMaskPassword(!maskPassword);
  };

  const handleLogin = ({ email, password }: FormikValues) => {
    login({ email, password });
  };

  /**
   * Hack for when Chrome autofill prevents typing in fields.
   * Appears to only happen after log out. Stack Overflow post:
   * https://stackoverflow.com/questions/58201291/chrome-autocomplete-lock-inputs-like-they-are-not-clickable
   */
  const unfreezeInput: MouseEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    target.value = value;
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
      <Stack
        sx={ { alignItems: "center", gap: 1, mt: [2, 4, 5], width: "100%" } }
      >
        <Button
          color="music"
          sx={ { alignSelf: "flex-end", mr: [1, 1, 2] } }
          variant="secondary"
          width="compact"
          onClick={ () => {
            history.push("/sign-up");
          } }
        >
          Create an account
        </Button>
        <ResponsiveNEWMLogo />
      </Stack>

      <Typography sx={ { mt: [4, 4, 5] } } variant="h1">
        Welcome
      </Typography>
      <Formik
        initialValues={ { email: "", password: "" } }
        validationSchema={ validationSchema }
        onSubmit={ handleLogin }
      >
        { ({ values: { password } }) => (
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
                isOptional={ false }
                name="email"
                placeholder="Email"
                type="email"
                onClick={ unfreezeInput }
              />
              <PasswordInputField
                aria-label="Password input field"
                externalMaskPassword={ maskPassword }
                handlePressEndAdornment={ togglePasswordMask }
                name="password"
                showEndAdornment={ !!password }
                onClick={ unfreezeInput }
              />

              <Button disabled={ isLoading } type="submit">
                Log In
              </Button>
              <Link
                color="grey100"
                mt={ 0.5 }
                sx={ { textDecoration: "none" } }
                to="/forgot-password"
                variant="subtitle1"
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

      <Stack alignItems="center" my={ 2 } pb={ 8 } spacing={ 2 } width="100%">
        <GoogleLogin>Continue with Google</GoogleLogin>
        <AppleLogin>Continue with Apple</AppleLogin>
      </Stack>
    </Box>
  );
};

export default Login;
