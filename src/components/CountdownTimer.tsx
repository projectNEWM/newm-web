import { Stack } from "@mui/material";
import { TimeRemaining } from "common";
import { GradientTypography } from "elements";
import { FunctionComponent } from "react";
import theme from "theme";

interface CountdownTimerProps {
  readonly timeRemaining: TimeRemaining;
}

interface CountdownSectionProps {
  readonly value: string;
  readonly label: string;
}

const CountdownSection: FunctionComponent<CountdownSectionProps> = ({
  value,
  label,
}) => {
  return (
    <Stack direction="column" spacing={ 0 }>
      <GradientTypography variant="h1" sx={ largeTextStyles }>
        { value }
      </GradientTypography>

      <GradientTypography
        variant="body1"
        sx={ {
          ...theme.typography.emphasized,
          fontSize: ["16px", "20px", "24px"],
          lineHeight: ["16px", "20px", "24px"],
          paddingBottom: 1,
        } }
      >
        { label }
      </GradientTypography>
    </Stack>
  );
};

const Separator: FunctionComponent = () => {
  return (
    <GradientTypography sx={ { ...largeTextStyles, padding: 0 } }>
      :
    </GradientTypography>
  );
};

const CountdownTimer: FunctionComponent<CountdownTimerProps> = ({
  timeRemaining: { days, hours, minutes, seconds },
}) => {
  return (
    <Stack direction="row">
      { days && (
        <CountdownSection
          value={ days }
          label={ ["01", "1"].includes(days) ? "day" : "days" }
        />
      ) }
      { days && <Separator /> }

      { hours && (
        <CountdownSection
          value={ hours }
          label={ ["01", "1"].includes(hours) ? "hour" : "hours" }
        />
      ) }
      { hours && <Separator /> }

      { minutes && (
        <CountdownSection
          value={ minutes }
          label={ ["01", "1"].includes(minutes) ? "minute" : "minutes" }
        />
      ) }
      { minutes && <Separator /> }

      { seconds && <CountdownSection value={ seconds } label="seconds" /> }
    </Stack>
  );
};

const largeTextStyles = {
  ...theme.typography.emphasized,
  fontSize: ["60px", "100px", "160px"],
  lineHeight: ["56px", "95px", "146px"],
};

export default CountdownTimer;
