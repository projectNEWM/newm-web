import { Box, Stack, useTheme } from "@mui/material";
import {
  Button,
  HorizontalLine,
  PasswordInputField,
  TextInputField,
  Typography,
} from "@newm-web/elements";
import { FunctionComponent, useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import { useAuthenticatedRedirect } from "../../common";
import { history } from "../../common/history";
import {
  FacebookLogin,
  GoogleLogin,
  LinkedInLogin,
  ResponsiveNEWMLogo,
} from "../../components";

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
      <Stack sx={ { alignItems: "center", gap: 1, width: "100%" } }>
        <Button
          color="music"
          sx={ { alignSelf: "flex-end" } }
          variant="secondary"
          width="compact"
          onClick={ () => {
            history.push("/login");
          } }
        >
          Already have an account?
        </Button>
        <ResponsiveNEWMLogo />
      </Stack>

      <Typography mt={ 5 } variant="h1">
        Welcome
      </Typography>
      <Stack
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
        <Button type="submit">Create account</Button>
      </Stack>

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

      <Stack alignItems="center" my={ 3 } pb={ 8 } spacing={ 2 } width="100%">
        <GoogleLogin>Join with Google</GoogleLogin>
        <FacebookLogin>Join with Facebook</FacebookLogin>
        <LinkedInLogin>Join with Linkedin</LinkedInLogin>
      </Stack>
    </Box>
  );
};

export default SignUp;
