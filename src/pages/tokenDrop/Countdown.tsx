import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { displayCountdown } from "common";
import { GradientTypography, Typography } from "elements";
import { FunctionComponent, useEffect, useState } from "react";

const Countdown: FunctionComponent = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [timeLeft, setTimeLeft] = useState("");

  const timeFontSize = isSmScreen ? "68px" : isMdScreen ? "100px" : "160px";
  const captionFontSize = isSmScreen ? "18px" : isMdScreen ? "24px" : "30px";

  useEffect(() => {
    const getTimeLeft = () => {
      const currentDate = new Date();
      const launchDate = new Date("October 8, 2022 00:00:00");

      return displayCountdown(launchDate, currentDate);
    };

    setTimeLeft(getTimeLeft());
    setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
  }, []);

  return (
    <Stack pt={ 4 } spacing={ 2 }>
      <GradientTypography
        variant="h1"
        sx={ {
          ...theme.typography.emphasized,
          fontSize: timeFontSize,
          lineHeight: timeFontSize,
        } }
      >
        { timeLeft }
      </GradientTypography>

      <Typography
        variant="h4"
        fontSize={ captionFontSize }
        lineHeight={ captionFontSize }
      >
        It&apos;s happening - first Stream Token sale ever!
      </Typography>
    </Stack>
  );
};

export default Countdown;
