import { FunctionComponent, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GradientTypography, Typography } from "elements";
import { ResponsiveNEWMLogo } from "components";

const Begin: FunctionComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // briefly display page and then navigate to profile form
    setTimeout(() => {
      navigate("/create-profile/what-should-we-call-you");
    }, 2400);
  }, [navigate]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mb={ 4 }>
        <ResponsiveNEWMLogo />
      </Box>

      <Typography variant="h1" sx={ { marginBottom: 1.5 } }>
        Aaaaand you&apos;re in.
      </Typography>

      <Box mt={ 1 } mb={ 8 }>
        <GradientTypography
          variant="h1"
          sx={ { ...theme.typography.emphasized } }
        >
          Let&apos;s set you up.
        </GradientTypography>
      </Box>
    </Box>
  );
};

export default Begin;
