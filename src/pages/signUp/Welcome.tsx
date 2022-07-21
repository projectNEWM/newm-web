import { Box, Stack, useTheme } from "@mui/material";
import { FilledButton, Typography } from "elements";
import { FunctionComponent, useState } from "react";
import { useAuthenticatedRedirect } from "common";
import { FormikValues, useFormikContext } from "formik";
import {
  FacebookLogin,
  GoogleLogin,
  LinkedInLogin,
  PasswordInputField,
  ResponsiveNEWMLogo,
  TextInputField,
} from "components";

const SignUp: FunctionComponent = () => {
  const theme = useTheme();
  const { isValid, values } = useFormikContext();
  const { newPassword, confirmPassword } = values as FormikValues;
  const [maskPassword, setMaskPassword] = useState(true);
  const showEndAdornment = !!(newPassword || confirmPassword);

  const togglePasswordMask = () => {
    setMaskPassword(!maskPassword);
  };

  useAuthenticatedRedirect();

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Box mb={ 4 }>
        <ResponsiveNEWMLogo />
      </Box>

      <Typography variant="h1" mb={ 5 }>
        Welcome
      </Typography>
      <Stack
        maxWidth={ theme.inputField.maxWidth }
        mb={ 5 }
        spacing={ 1.5 }
        width="100%"
      >
        <TextInputField
          aria-label="Email input field"
          name="email"
          placeholder="E-mail"
          type="email"
        />
        <PasswordInputField
          aria-label="Password input field"
          externalMaskPassword={ maskPassword }
          handlePressEndAdornment={ togglePasswordMask }
          name="newPassword"
          showEndAdornment={ showEndAdornment }
        />
        <PasswordInputField
          aria-label="Confirm password input field"
          externalMaskPassword={ maskPassword }
          handlePressEndAdornment={ togglePasswordMask }
          name="confirmPassword"
          placeholder="Confirm password"
          showEndAdornment={ showEndAdornment }
        />
        <FilledButton disabled={ !isValid } type="submit">
          Enter
        </FilledButton>
      </Stack>

      <Typography align="center" mb={ 2 }>
        or sign up via
      </Typography>

      <Stack direction="row" spacing={ 2 }>
        <GoogleLogin />
        <FacebookLogin />
        <LinkedInLogin />
      </Stack>
    </Box>
  );
};

export default SignUp;
