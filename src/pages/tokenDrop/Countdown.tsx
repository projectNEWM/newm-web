import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "elements";
import { CountdownTimer } from "components";
import { FunctionComponent, useEffect, useState } from "react";
import { projectDetails } from "buildParams";
import { TimeRemaining, getTimeRemaining } from "common";

const Countdown: FunctionComponent = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    hours: "00",
    days: "00",
    minutes: "00",
    seconds: "00",
  });

  const captionFontSize = isSmScreen ? "18px" : isMdScreen ? "24px" : "30px";

  useEffect(() => {
    const getTimeLeft = () => {
      const currentDate = new Date();
      const launchDate = new Date(projectDetails.launchTimestamp);

      return getTimeRemaining(launchDate, currentDate);
    };

    setTimeLeft(getTimeLeft());
    setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
  }, []);

  return (
    <Stack pt={ 4 } spacing={ 2.5 }>
      <CountdownTimer timeRemaining={ timeLeft } />

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
