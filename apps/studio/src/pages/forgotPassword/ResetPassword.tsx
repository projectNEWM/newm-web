import { FunctionComponent, useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button, PasswordInputField } from "@newm-web/elements";

const ResetPassword: FunctionComponent = () => {
  const theme = useTheme();
  const [maskPassword, setMaskPassword] = useState(true);
  const {
    values: { confirmPassword, newPassword },
  } = useFormikContext<FormikValues>();

  const togglePasswordMask = () => {
    setMaskPassword(!maskPassword);
  };

  const showEndAdornment = !!(newPassword || confirmPassword);

  return (
    <Box
      sx={ {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      } }
    >
      <Typography mt={ 4 } variant="h1">
        Enter your new password
      </Typography>

      <Stack
        maxWidth={ theme.inputField.maxWidth }
        mx="auto"
        my={ 7.5 }
        spacing={ 1.5 }
        width="100%"
      >
        <PasswordInputField
          aria-label="Enter your new password"
          externalMaskPassword={ maskPassword }
          handlePressEndAdornment={ togglePasswordMask }
          name="newPassword"
          placeholder="Your new password"
          showEndAdornment={ showEndAdornment }
        />
        <PasswordInputField
          aria-label="Confirm your new password"
          externalMaskPassword={ maskPassword }
          handlePressEndAdornment={ togglePasswordMask }
          name="confirmPassword"
          placeholder="Confirm password"
          showEndAdornment={ showEndAdornment }
        />
        <Button type="submit">Confirm</Button>
      </Stack>
    </Box>
  );
};

export default ResetPassword;
