import { FunctionComponent, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { FormikValues, useFormikContext } from "formik";
import { Button, GradientTypography, Typography } from "elements";
import { TextInputField } from "components";
import { sendVerificationEmail } from "modules/session";
import { useAppDispatch } from "common";

const VerifyEmail: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [showResendLink, setShowResendLink] = useState(true);
  const {
    values: { email },
  } = useFormikContext<FormikValues>();

  const handleEmailResend = () => {
    setShowResendLink(false);

    dispatch(sendVerificationEmail(email));

    setTimeout(() => setShowResendLink(true), 10000);
  };

  return (
    <Box
      sx={ {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      } }
    >
      <Box
        sx={ {
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        } }
      >
        <Typography maxWidth={ 800 } mt={ 4 } variant="h1">
          Check your email!
        </Typography>

        <GradientTypography
          id="verificationLabel"
          mb={ 4 }
          style={ { ...theme.typography.emphasized } }
          variant="h1"
        >
          Enter your verification code below:
        </GradientTypography>

        <TextInputField
          aria-labelledby="verificationLabel"
          isOptional={ false }
          name="authCode"
          placeholder="Verification Code"
          type="text"
        />

        <Button sx={ { mt: 2 } } type="submit">
          Reset password
        </Button>
      </Box>

      <Box my={ 4 } textAlign="center">
        { showResendLink ? (
          <Typography color="grey100" fontWeight={ 500 }>
            Didn&apos;t receive an email?
            <button
              onClick={ handleEmailResend }
              style={ {
                backgroundColor: "initial",
                border: "none",
                borderRadius: 0,
                color: "white",
                font: "inherit",
              } }
            >
              Click here to resend
            </button>
          </Typography>
        ) : (
          <Typography>
            Email re-sent. Don&apos;t forget to check your spam folder.
          </Typography>
        ) }
      </Box>
    </Box>
  );
};

export default VerifyEmail;
