import { Box, Stack, useTheme } from "@mui/material";
import { Button, HorizontalLine, Typography } from "@newm.io/studio/elements";
import { FunctionComponent, useState } from "react";
import { useAuthenticatedRedirect } from "@newm.io/studio/common";
import { history } from "@newm.io/studio/common/history";
import { FormikValues, useFormikContext } from "formik";
import {
  FacebookLogin,
  GoogleLogin,
  LinkedInLogin,
  PasswordInputField,
  ResponsiveNEWMLogo,
  TextInputField,
} from "@newm.io/studio/components";

const SignUp: FunctionComponent = () => {
  const theme = useTheme();
  const { values } = useFormikContext();
  const { newPassword, confirmPassword } = values as FormikValues;
  const [maskPassword, setMaskPassword] = useState(true);
  const showEndAdornment = !!(newPassword || confirmPassword);

  const togglePasswordMask = () => {
    setMaskPassword(!maskPassword);
  };

  useAuthenticatedRedirect();

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Stack sx={{ alignItems: "center", gap: 1, width: "100%" }}>
        <Button
          color="music"
          onClick={() => {
            history.push("/login");
          }}
          sx={{ alignSelf: "flex-end" }}
          variant="secondary"
          width="compact"
        >
          Already have an account?
        </Button>
        <ResponsiveNEWMLogo />
      </Stack>

      <Typography variant="h1" mt={5}>
        Welcome
      </Typography>
      <Stack
        maxWidth={theme.inputField.maxWidth}
        mt={3}
        spacing={1.5}
        width="100%"
      >
        <TextInputField
          aria-label="Email input field"
          isOptional={false}
          name="email"
          placeholder="Email"
          type="email"
        />
        <PasswordInputField
          aria-label="Password input field"
          externalMaskPassword={maskPassword}
          handlePressEndAdornment={togglePasswordMask}
          name="newPassword"
          showEndAdornment={showEndAdornment}
        />
        <PasswordInputField
          aria-label="Confirm password input field"
          externalMaskPassword={maskPassword}
          handlePressEndAdornment={togglePasswordMask}
          name="confirmPassword"
          placeholder="Confirm password"
          showEndAdornment={showEndAdornment}
        />
        <Button type="submit">Create account</Button>
      </Stack>

      <Stack
        alignItems="center"
        columnGap={2}
        direction="row"
        maxWidth={theme.inputField.maxWidth}
        mt={3}
        width="100%"
      >
        <HorizontalLine />
        <Typography>or</Typography>
        <HorizontalLine />
      </Stack>

      <Stack my={3} spacing={2} width="100%" alignItems="center" pb={8}>
        <GoogleLogin>Join with Google</GoogleLogin>
        <FacebookLogin>Join with Facebook</FacebookLogin>
        <LinkedInLogin>Join with Linkedin</LinkedInLogin>
      </Stack>
    </Box>
  );
};

export default SignUp;
