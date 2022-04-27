import { FunctionComponent } from "react";
import NEWMLogo from "assets/images/NEWMLogo";
import { FilledButton, GradientTypography, Typography } from "elements";
import { TextInputField } from "components";
import { useFormikContext } from "formik";
import { Box, Stack } from "@mui/material";

const Verification: FunctionComponent = () => {
  const { isValid } = useFormikContext();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mb={ 7.5 } alignSelf="center">
        <NEWMLogo />
      </Box>
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
          placeholder="VerificationCode"
          type="text"
        />
        <FilledButton type="submit" disabled={ !isValid }>
          Enter
        </FilledButton>
      </Stack>

      <Typography
        align="center"
        bottom="32px"
        position="absolute"
      >
        Didn&apos;t received the email? Resend email.***TURN ME INTO A LINK AND DO SOMETHING ***
      </Typography>
    </Box>
  );
};

export default Verification;
