import { FunctionComponent } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { Box, CircularProgressProps } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

interface GradientCircularProgressProps
  extends Omit<CircularProgressProps, "color"> {
  readonly startColor: keyof Theme["colors"];
  readonly endColor: keyof Theme["colors"];
}

const useStyles = makeStyles(() => ({
  circle: {
    stroke: "url(#linearColors)",
  },
}));

const GradientCircularProgress: FunctionComponent<
  GradientCircularProgressProps
> = ({ startColor, endColor, ...props }) => {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <Box>
      <svg width={ 0 } height={ 0 }>
        <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
          <stop offset="20%" stopColor={ theme.colors[startColor] } />
          <stop offset="90%" stopColor={ theme.colors[endColor] } />
        </linearGradient>
      </svg>

      <CircularProgress
        thickness={ 4 }
        classes={ { circle: classes.circle } }
        { ...props }
      />
    </Box>
  );
};

export default GradientCircularProgress;
