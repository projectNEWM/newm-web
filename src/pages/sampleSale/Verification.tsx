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
      <Box alignItems="center" display="flex" flexDirection="column">
        <Box mb={ 4 }>
          <ResponsiveNEWMLogo />
        </Box>
        <Typography mb={ 1.5 } variant="h1">
          Check your email!
        </Typography>
        <GradientTypography
          id="verificationLabel"
          mb={ 7.5 }
          style={ { ...theme.typography.emphasized } }
          variant="h1"
        >
          Enter your verification code below:
        </GradientTypography>
        <Stack
          margin="0 auto"
          maxWidth={ theme.inputField.maxWidth }
          mb={ 7.5 }
          spacing={ 1.5 }
          width="100%"
        >
          <TextInputField
            aria-labelledby="verificationLabel"
            name="authCode"
            placeholder="Verification Code"
            type="text"
          />
          <FilledButton disabled={ !isValid } type="submit">
            Sign Up
          </FilledButton>
          <Typography color="grey200" fontWeight={ 500 }>
            By clicking &apos;Sign Up&apos;, you agree to NEWM&apos;s
            <a
              href="https://newm.io/privacy-policy/"
              rel="noreferrer"
              style={ { display: "inline-flex", color: theme.colors.grey200 } }
              target="_blank"
            >
              Privacy Policy &amp; Terms of Service
            </a>
            .
          </Typography>
        </Stack>
      </Box>

      <Stack mb={ 4 } mt={ 2 }>
        { showResendLink ? (
          <Typography fontWeight={ 400 }>
            Didn&apos;t receive an email? Click
            <Link
              component="span"
              onClick={ handleEmailResend }
              sx={ { display: "inline-flex" } }
              to="#"
            >
              &nbsp;here&nbsp;
            </Link>
            to resend.
          </Typography>
        ) : (
          <Typography>
            Email re-sent. Don&apos;t forget to check your spam folder.
          </Typography>
        ) }
      </Stack>
    </Box>
  );
};

export default Verification;
