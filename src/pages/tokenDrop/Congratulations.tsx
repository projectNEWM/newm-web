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
import { MailchimpSubscribeForm, SectionHeading } from "components";

const Congratulations: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const window = useWindowDimensions();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleGoHome = () => {
    navigate("../");
  };

  return (
    <Box>
      <Box
        sx={ {
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          pointerEvents: "none",
        } }
      >
        <Confetti
          width={ window.width }
          height={ window.height }
          tweenDuration={ 1 }
          gravity={ 0.05 }
          initialVelocityY={ 600 }
        />
      </Box>
      <Stack mt={ 8 } mb={ 3 } spacing={ [1, 1, 0] } pr={ [0, 0, 2] }>
        <GradientTypography
          sx={ {
            ...theme.typography.emphasized,
            fontSize: 100,
            lineHeight: "100px",
            fontWeight: 400,
            paddingBottom: "10px", // padding to prevent "y" from being clipped
          } }
          backupColor="orange"
          gradient="partners"
          variant="h1"
        >
          Break out the bubbly!
        </GradientTypography>

        <Box maxWidth={ [9999, 9999, 320] }>
          <Typography variant="subtitle1" color="white">
            How does it feel to own a piece of music?
            { isLargeScreen ? <br /> : " " }
            To learn more about your purchase and join our community of music
            owners, signup below.
          </Typography>
        </Box>
      </Stack>

      <Stack mb={ 6 } spacing={ 1 }>
        <SectionHeading>TELL ME MORE ABOUT THIS DROP!</SectionHeading>
        <MailchimpSubscribeForm
          u="3bf911620d8791d21fb973749"
          id="52df6705d1"
          fId="006275e2f0"
          hiddenInputName="b_3bf911620d8791d21fb973749_52df6705d1"
          groupValue="2"
          groupName="group[383765][2]"
        />
      </Stack>

      <OutlinedButtonNoGradient
        onClick={ handleGoHome }
        sx={ { width: isLargeScreen ? "auto" : "100%" } }
      >
        Back to home
      </OutlinedButtonNoGradient>
    </Box>
  );
};

export default Congratulations;
