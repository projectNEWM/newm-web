import { FunctionComponent } from "react";
import { Box, Link, useTheme } from "@mui/material";
import { Button, GradientTypography, Typography } from "elements";
import { ResponsiveNEWMLogo } from "components";
import {
  NEWM_PRIVACY_POLICY_URL,
  NEWM_STUDIO_TERMS_OF_SERVICE_URL,
} from "common";

const Complete: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={ {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        justifyContent: ["space-between", "space-between", "flex-start"],
      } }
    >
      <div>
        <Box mb={ 4 }>
          <ResponsiveNEWMLogo />
        </Box>
        <Typography variant="h1" sx={ { display: "block" } }>
          Aaaaand we&apos;re done.
        </Typography>

        <Box mt={ 1 } mb={ 6 }>
          <GradientTypography
            variant="h1"
            sx={ { ...theme.typography.emphasized } }
          >
            Shall we?
          </GradientTypography>
        </Box>
      </div>
      <Box alignItems="center" display="flex" flexDirection="column" mb={ 4 }>
        <Button
          sx={ { mb: [null, null, 3], mt: [2, 2, null], order: ["2", "2", "0"] } }
          type="submit"
        >
          Enter NEWM
        </Button>

        <Typography color="grey200" variant="subtitle1">
          By clicking &apos;Enter NEWM&apos;, you agree to
          <br />
          NEWM&apos;s{ " " }
          <Link
            color={ theme.colors.grey200 }
            href={ NEWM_PRIVACY_POLICY_URL }
            target="_blank"
            rel="noopener"
            variant="subtitle1"
          >
            Privacy Policy
          </Link>
          { " & " }
          <Link
            color={ theme.colors.grey200 }
            href={ NEWM_STUDIO_TERMS_OF_SERVICE_URL }
            target="_blank"
            rel="noopener"
            variant="subtitle1"
          >
            Terms of Service
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  );
};

export default Complete;
