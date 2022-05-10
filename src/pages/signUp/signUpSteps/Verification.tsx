import { FunctionComponent, useState } from "react";
import { FilledButton, GradientTypography, Link, Typography } from "elements";
import { TextInputField } from "components";
import { FormikValues, useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import { Box, Stack } from "@mui/material";
import { sendVerificationEmail } from "modules/session";

const Verification: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [showResendLink, setShowResendLink] = useState(true);
  const { isValid, values } = useFormikContext<FormikValues>();

  const handleEmailResend = () => {
    setShowResendLink(false);

    dispatch(sendVerificationEmail(values.email));

    setTimeout(() => setShowResendLink(true), 10000);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography
        align="center"
        fontFamily="Raleway"
        fontWeight="extra-bold"
        marginBottom="12px"
        variant="xxxl"
      >
        Check your email!
      </Typography>
      <GradientTypography
        align="center"
        fontFamily="DM Serif Text"
        fontStyle="italic"
        fontWeight="regular"
        id="verificationLabel"
        marginBottom="60px"
        variant="xxxl"
      >
        Paste your verification code here.
      </GradientTypography>
      <Stack spacing={ 1.5 } mb={ 7.5 } maxWidth="312px" width="100%">
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

      <Box
        alignSelf="center"
        position="absolute"
        bottom="32px"
        left="0"
        right="0"
        color="grey200"
      >
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
