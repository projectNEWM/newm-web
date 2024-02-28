import { FunctionComponent, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { FormikValues, useFormikContext } from "formik";
import { Button, GradientTypography, TextInputField } from "@newm-web/elements";
import { sendVerificationEmail } from "../../modules/session";
import { useAppDispatch } from "../../common";

const VerifyEmail: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [showResendLink, setShowResendLink] = useState(true);
  const {
    values: { email },
  } = useFormikContext<FormikValues>();

  const handleEmailResend = () => {
    setShowResendLink(false);

    dispatch(sendVerificationEmail({ email, mustExists: true }));

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

      <Box maxWidth={ 400 } my={ 4 } textAlign="center">
        { showResendLink ? (
          <Typography color={ theme.colors.grey100 } fontWeight={ 500 }>
            If you do not receive the notification within a few minutes and
            you&apos;ve confirmed entering the right email address, try checking
            your “spam” folder or
            <button
              style={ {
                backgroundColor: "initial",
                border: "none",
                borderRadius: 0,
                color: "white",
                cursor: "pointer",
                font: "inherit",
                paddingRight: 0,
              } }
              onClick={ handleEmailResend }
            >
              click here to resend
            </button>
            .
          </Typography>
        ) : (
          <Typography>
            Email re-sent. Don&apos;t forget to check your &ldquo;spam&rdquo;
            folder.
          </Typography>
        ) }
      </Box>
    </Box>
  );
};

export default VerifyEmail;
