import { FunctionComponent, useState } from "react";
import { FilledButton, GradientTypography, Link, Typography } from "elements";
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
      <Box>
        <Box mb={ 4 }>
          <ResponsiveNEWMLogo />
        </Box>
        <Typography
          variant="h1"
          sx={ {
            marginBottom: 1.5,
            display: "block",
          } }
        >
          Check your email!
        </Typography>
        <GradientTypography
          id="verificationLabel"
          variant="h1"
          sx={ {
            ...theme.typography.emphasized,
            marginBottom: 7.5,
          } }
        >
          Paste your verification code here.
        </GradientTypography>
        <Stack
          spacing={ 1.5 }
          mb={ 7.5 }
          margin="0 auto"
          maxWidth="312px"
          width="100%"
        >
          <TextInputField
            aria-labelledby="verificationLabel"
            name="authCode"
            placeholder="Verification Code"
            type="text"
          />
          <FilledButton type="submit" disabled={ !isValid }>
            Enter
          </FilledButton>
        </Stack>
      </Box>

      <Box mb={ 4 } mt={ 2 }>
        { showResendLink ? (
          <Link to="#" onClick={ handleEmailResend }>
            Didn&apos;t received the email? Resend email.
          </Link>
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
