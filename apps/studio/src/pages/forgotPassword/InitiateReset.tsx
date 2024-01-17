import { FunctionComponent } from "react";
import { Button, TextInputField, Typography } from "@newm-web/elements";
import { Box, Stack, useTheme } from "@mui/material";

const InitiateReset: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={ {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        mb: 8,
        textAlign: "center",
      } }
    >
      <Typography maxWidth={ 800 } mt={ 4 } variant="h1">
        Enter your email to reset your password
      </Typography>

      <Stack
        maxWidth={ theme.inputField.maxWidth }
        mx="auto"
        my={ 7.5 }
        spacing={ 1.5 }
        width="100%"
      >
        <TextInputField
          aria-label="Enter email to reset password"
          isOptional={ false }
          name="email"
          placeholder="Your email"
          type="text"
        />
        <Button type="submit">Reset password</Button>
      </Stack>
    </Box>
  );
};

export default InitiateReset;
