import { FunctionComponent, useState } from "react";
import { Button, GradientTypography, Typography } from "elements";
import { ResponsiveNEWMLogo, TextInputField } from "components";
import { FormikValues, useFormikContext } from "formik";
import { Box, Stack, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendVerificationEmail } from "modules/session";

const Verification: FunctionComponent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [showResendLink, setShowResendLink] = useState(true);
  const { isValid, values } = useFormikContext<FormikValues>();

  const handleEmailResend = () => {
    setShowResendLink(false);

    dispatch(sendVerificationEmail(values.email));

    setTimeout(() => setShowResendLink(true), 10000);
  };

  return (
    <Box
      sx={ {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        justifyContent: "space-between",
      } }
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb={ 4 }>
          <ResponsiveNEWMLogo />
        </Box>
        <Typography variant="h1" mb={ 1.5 }>
          Check your email!
        </Typography>
        <GradientTypography
          id="verificationLabel"
          variant="h1"
          mb={ 7.5 }
          style={ { ...theme.typography.emphasized } }
        >
          Paste your verification code here.
        </GradientTypography>
        <Stack
          spacing={ 1.5 }
          mb={ 7.5 }
          margin="0 auto"
          maxWidth={ theme.inputField.maxWidth }
          width="100%"
        >
          <TextInputField
            aria-labelledby="verificationLabel"
            name="authCode"
            placeholder="Verification Code"
            type="text"
          />
          <Button type="submit" disabled={ !isValid }>
            Enter
          </Button>
        </Stack>
      </Box>

      <Box mb={ 4 } mt={ 2 }>
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

export default Verification;
