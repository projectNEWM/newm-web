import { FunctionComponent, useState } from "react";
import {
  Button,
  GradientTypography,
  TextInputField,
  Typography,
} from "@newm-web/elements";
import { FormikValues, useFormikContext } from "formik";
import { Box, Stack, useTheme } from "@mui/material";
import { ResponsiveNEWMLogo } from "../../components";
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
            isOptional={ false }
            name="authCode"
            placeholder="Verification Code"
            type="text"
          />
          <Button type="submit">Enter</Button>
        </Stack>
      </Box>

      <Box mt={ 2 } pb={ 4 }>
        { showResendLink ? (
          <Typography color="grey100" fontWeight={ 500 }>
            Didn&apos;t receive an email?
            <button
              style={ {
                backgroundColor: "initial",
                border: "none",
                borderRadius: 0,
                color: "white",
                font: "inherit",
              } }
              onClick={ handleEmailResend }
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
