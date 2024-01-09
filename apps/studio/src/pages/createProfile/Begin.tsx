import { FunctionComponent, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GradientTypography, Typography } from "@newm-web/elements";
import { ResponsiveNEWMLogo } from "../../components";

const Begin: FunctionComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // briefly display page and then navigate to profile form
    setTimeout(() => {
      navigate("/create-profile/what-is-your-first-name");
    }, 2400);
  }, [navigate]);

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Box mb={ 4 }>
        <ResponsiveNEWMLogo />
      </Box>

      <Typography sx={ { marginBottom: 1.5 } } variant="h1">
        Aaaaand you&apos;re in.
      </Typography>

      <Box mb={ 8 } mt={ 1 }>
        <GradientTypography
          sx={ { ...theme.typography.emphasized } }
          variant="h1"
        >
          Let&apos;s set you up.
        </GradientTypography>
      </Box>
    </Box>
  );
};

export default Begin;
