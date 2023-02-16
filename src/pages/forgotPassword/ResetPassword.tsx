import { FunctionComponent, useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import { Box, Stack, useTheme } from "@mui/material";
import { Button, Typography } from "elements";
import { PasswordInputField } from "components";

const ResetPassword: FunctionComponent = () => {
  const theme = useTheme();
  const [maskPassword, setMaskPassword] = useState(true);
  const {
    isValid,
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
      <Typography variant="h1" mt={ 4 }>
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
        <Button type="submit" disabled={ !isValid }>
          Reset password
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPassword;
