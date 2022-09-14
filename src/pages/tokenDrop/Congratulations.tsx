import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useWindowDimensions } from "common";
import {
  GradientTypography,
  OutlinedButtonNoGradient,
  Typography,
} from "elements";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const Congratulations: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const window = useWindowDimensions();
  const isMdScreen = useMediaQuery(
    `(min-width:${theme.breakpoints.values.md}px)`
  );

  const textStyles = {
    ...theme.typography.emphasized,
    fontSize: 80,
    fontWeight: 400,
    color: theme.palette.success.main,
  };

  const handleGoHome = () => {
    navigate("../");
  };

  return (
    <Box>
      <Box sx={ { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 } }>
        <Confetti
          width={ window.width }
          height={ window.height }
          tweenDuration={ 10000 }
          gravity={ 0.05 }
        />
      </Box>

      <Stack mt={ 8 } mb={ 6 } spacing={ 2 }>
        { isMdScreen ? (
          <Typography
            variant="h1"
            color="orange"
            sx={ {
              ...theme.typography.emphasized,
              fontSize: 100,
              fontWeight: 400,
            } }
          >
            Congratulations!
          </Typography>
        ) : (
          <Box>
            <Typography sx={ textStyles } variant="h1">
              Congra-
            </Typography>
            <GradientTypography sx={ textStyles } variant="h1">
              Wait for it-
            </GradientTypography>
            <Typography sx={ textStyles } variant="h1">
              lations!
            </Typography>
          </Box>
        ) }

        <Typography fontFamily="Raleway" fontSize={ 20 } fontWeight={ 800 }>
          Purchase completed
        </Typography>
      </Stack>

      <OutlinedButtonNoGradient
        onClick={ handleGoHome }
        sx={ { width: isMdScreen ? "auto" : "100%" } }
      >
        Back to home
      </OutlinedButtonNoGradient>
    </Box>
  );
};

export default Congratulations;
