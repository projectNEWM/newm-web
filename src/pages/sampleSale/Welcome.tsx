import { Box, Stack, useTheme } from "@mui/material";
import { FilledButton, Typography } from "elements";
import { FunctionComponent, useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import {
  PasswordInputField,
  ResponsiveNEWMLogo,
  TextInputField,
} from "components";

const Welcome: FunctionComponent = () => {
  const theme = useTheme();
  const { isValid, values } = useFormikContext();
  const { newPassword, confirmPassword } = values as FormikValues;
  const [maskPassword, setMaskPassword] = useState(true);
  const showEndAdornment = !!(newPassword || confirmPassword);

  const togglePasswordMask = () => {
    setMaskPassword(!maskPassword);
  };

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
          autoComplete="off"
          name="email"
          placeholder="Email"
          type="email"
        />
        <PasswordInputField
          aria-label="Password input field"
          autoComplete="off"
          externalMaskPassword={ maskPassword }
          handlePressEndAdornment={ togglePasswordMask }
          name="newPassword"
          showEndAdornment={ showEndAdornment }
        />
        <PasswordInputField
          aria-label="Confirm password input field"
          autoComplete="off"
          externalMaskPassword={ maskPassword }
          handlePressEndAdornment={ togglePasswordMask }
          name="confirmPassword"
          placeholder="Confirm password"
          showEndAdornment={ showEndAdornment }
        />
        <TextInputField
          aria-label="Wallet address"
          autoComplete="off"
          name="walletAddress"
          placeholder="Wallet address (optional)"
        />
        <FilledButton disabled={ !isValid } type="submit">
          Sign Up
        </FilledButton>
      </Stack>
    </Box>
  );
};

export default Welcome;
