import { Stack } from "@mui/material";
import { GradientTypography } from "@newm-web/elements";
import theme from "@newm-web/theme";

const LaunchBanner = () => {
  return (
    <Stack alignItems="center" gap={ 0.5 } mt={ 5 } textAlign="center">
      <GradientTypography
        sx={ {
          ...theme.typography.emphasized,
          fontSize: ["24px", "32px", "40px"],
          lineHeight: ["32px", "40px", "46px"],
        } }
        variant="h2"
      >
        Welcome to Your Music Rights Marketplace
      </GradientTypography>
    </Stack>
  );
};

export default LaunchBanner;
