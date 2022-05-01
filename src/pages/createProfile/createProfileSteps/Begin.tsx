import { FunctionComponent, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GradientTypography, Typography } from "elements";

const Begin: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // briefly display page and then navigate to profile form
    setTimeout(() => {
      navigate("/create-profile/what-should-we-call-you");
    }, 2400);
  }, [navigate]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">

      <Typography
        align="center"
        fontWeight="extra-bold"
        variant="xxxl"
        fontFamily="Raleway"
      >
        Aaaaand you&apos;re in.
      </Typography>

      <Box mt={ 1 } mb={ 8 }>
        <GradientTypography
          variant="xxxl"
          fontFamily="DM Serif Text"
          fontWeight="regular"
          fontStyle="italic"
        >
          Let&apos;s set you up.
        </GradientTypography>
      </Box>
    </Box>
  );
};

export default Begin;
