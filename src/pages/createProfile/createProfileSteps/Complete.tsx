import { FunctionComponent } from "react";
import { Box, useTheme } from "@mui/material";
import { FilledButton, GradientTypography, Link, Typography } from "elements";
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
        <Typography sx={ { ...theme.typography.heading, display: "block" } }>
          Aaaaand we&apos;re done.
        </Typography>

        <Box mt={ 1 } mb={ 6 }>
          <GradientTypography
            sx={ { ...theme.typography.gradient } }
            variant="subtitle1"
          >
            Shall we?
          </GradientTypography>
        </Box>
      </div>
      <Box alignItems="center" display="flex" flexDirection="column" mb={ 4 }>
        <FilledButton
          sx={ {
            marginBottom: [null, null, 2],
            marginTop: [2, 2, null],
            maxWidth: ["352px", "352px", "220px"],
            order: ["2", "2", "0"],
            width: "100%",
          } }
          type="submit"
        >
          Enter NEWM
        </FilledButton>
        <Typography color="grey200" display="block" fontWeight="medium">
          By proceeding forward you agree to&nbsp;
          <Link fontWeight="medium" to="#">
            projectNEWM&apos;s Terms of Service
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Complete;
