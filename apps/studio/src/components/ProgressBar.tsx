import { Box, useTheme } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';

interface Props {
  /* Number between 1 and 100 representing the target progress percentage */
  readonly progress: number;
  /* Amount of seconds that animation should last */
  readonly animationSeconds?: number;
}

const ProgressBar: FunctionComponent<Props> = ({
  progress,
  animationSeconds = 10,
}) => {
  const theme = useTheme();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const animatedProgressPercentage = animatedProgress + '%';

  /**
   * Update progress to ensure it animates from zero
   */
  useEffect(() => {
    setAnimatedProgress(progress);
  }, [progress]);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.colors.grey400,
        borderRadius: 1.5,
        overflow: 'hidden',
        padding: 1,
      }}
    >
      <Box
        sx={{
          height: '2rem',
          width: animatedProgressPercentage,
          backgroundColor: theme.colors.music,
          borderRadius: 1,
          transition: `width ${animationSeconds}s ease-out`,
        }}
      />
    </Box>
  );
};

export default ProgressBar;
