import { FunctionComponent } from "react";
import { Box, useTheme } from "@mui/material";
import { Button, GradientTypography, Link, Typography } from "elements";
import { ResponsiveNEWMLogo } from "components";

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
          sx={ { mb: [null, null, 2], mt: [2, 2, null], order: ["2", "2", "0"] } }
          type="submit"
        >
          Enter NEWM
        </Button>

        <Typography color="grey200" fontWeight={ 500 }>
          By proceeding forward you agree to&nbsp;
          <Link fontWeight={ 500 } color="grey200" to="#">
            projectNEWM&apos;s Terms of Service
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Complete;
