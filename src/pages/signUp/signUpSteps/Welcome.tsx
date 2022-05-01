import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Stack, useTheme } from "@mui/material";
import { FilledButton, Typography } from "elements";
import { FunctionComponent, useEffect, useState } from "react";
import { useAuthenticatedRedirect } from "common";
import { FormikValues, useFormikContext } from "formik";
import {
  FacebookLogin,
  GoogleLogin,
  LinkedInLogin,
  TextInputField,
} from "components";


const SignUp: FunctionComponent = () => {
  const theme = useTheme();
  const { isValid, values } = useFormikContext();
  const { newPassword, confirmPassword } = values as FormikValues; 
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  useAuthenticatedRedirect();

  useEffect(()=> {
    newPassword || confirmPassword ? setShowPasswordIcon(true) : setShowPasswordIcon(false);
  },[newPassword, confirmPassword]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const PasswordEndAdornment = () => {
    const PasswordIcon = showPassword ? VisibilityOffIcon : VisibilityIcon;

    return showPasswordIcon ? (
      <IconButton
        aria-label="Change password field visible status"
        onClick={ togglePassword }
      >
        <PasswordIcon sx={ { color: theme.colors.white } } />
      </IconButton>
    ) : null;
  };

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Typography
        align="center"
        fontFamily="Raleway"
        fontWeight="extra-bold"
        marginBottom="40px"
        variant="xxxl"
      >
        Welcome
      </Typography>
      <Stack maxWidth="312px" mb={ 5 } spacing={ 1.5 } width="100%">
        <TextInputField
          aria-label="Email input field"
          name="email"
          placeholder="E-mail"
          type="email"
        />
        <TextInputField
          aria-label="Password input field"
          endAdornment={ <PasswordEndAdornment /> }
          name="newPassword"
          placeholder="Password"
          type={ showPassword ? "text" : "password" }
        />
        <TextInputField
          aria-label="Confirm password input field"
          endAdornment={ <PasswordEndAdornment /> }
          name="confirmPassword"
          placeholder="Confirm password"
          type={ showPassword ? "text" : "password" }
        />
        <FilledButton disabled={ !isValid } type="submit">
          Enter
        </FilledButton>
      </Stack>
      <Typography align="center" marginBottom="16px">
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
