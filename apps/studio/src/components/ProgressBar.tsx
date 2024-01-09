import { Box, useTheme } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";

interface Props {
  /* Amount of seconds that animation should last */
  readonly animationSeconds?: number;
  /* Number between 1 and 100 representing the target progress percentage */
  readonly progress: number;
}

const ProgressBar: FunctionComponent<Props> = ({
  progress,
  animationSeconds = 10,
}) => {
  const theme = useTheme();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const animatedProgressPercentage = animatedProgress + "%";

  /**
   * Update progress to ensure it animates from zero
   */
  useEffect(() => {
    setAnimatedProgress(progress);
  }, [progress]);

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.grey400,
        borderRadius: 1.5,
        overflow: "hidden",
        padding: 1,
        width: "100%",
      } }
    >
      <Box
        sx={ {
          backgroundColor: theme.colors.music,
          borderRadius: 1,
          height: "2rem",
          transition: `width ${animationSeconds}s ease-out`,
          width: animatedProgressPercentage,
        } }
      />
    </Box>
  );
};

export default ProgressBar;
