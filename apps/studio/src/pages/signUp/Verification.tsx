import { FunctionComponent, useState } from "react";
import {
  Button,
  GradientTypography,
  Typography,
  TextInputField,
} from "@newm-web/elements";
import { ResponsiveNEWMLogo } from "../../components";
import { FormikValues, useFormikContext } from "formik";
import { Box, Stack, useTheme } from "@mui/material";
import { sendVerificationEmail } from "../../modules/session";
import { useAppDispatch } from "../../common";

const Verification: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [showResendLink, setShowResendLink] = useState(true);
  const { values } = useFormikContext<FormikValues>();

  const handleEmailResend = () => {
    setShowResendLink(false);

    dispatch(sendVerificationEmail(values.email));

    setTimeout(() => setShowResendLink(true), 10000);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb={4}>
          <ResponsiveNEWMLogo />
        </Box>
        <Typography variant="h1" mb={1.5}>
          Check your email!
        </Typography>
        <GradientTypography
          id="verificationLabel"
          variant="h1"
          mb={7.5}
          style={{ ...theme.typography.emphasized }}
        >
          Enter your verification code below:
        </GradientTypography>
        <Stack
          spacing={1.5}
          mb={7.5}
          margin="0 auto"
          maxWidth={theme.inputField.maxWidth}
          width="100%"
        >
          <TextInputField
            aria-labelledby="verificationLabel"
            isOptional={false}
            name="authCode"
            placeholder="Verification Code"
            type="text"
          />
          <Button type="submit">Enter</Button>
        </Stack>
      </Box>

      <Box pb={4} mt={2}>
        {showResendLink ? (
          <Typography color="grey100" fontWeight={500}>
            Didn&apos;t receive an email?
            <button
              onClick={handleEmailResend}
              style={{
                backgroundColor: "initial",
                border: "none",
                borderRadius: 0,
                color: "white",
                font: "inherit",
              }}
            >
              Click here to resend
            </button>
          </Typography>
        ) : (
          <Typography>
            Email re-sent. Don&apos;t forget to check your spam folder.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Verification;
