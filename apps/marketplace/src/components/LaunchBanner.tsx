import { Stack, Typography } from "@mui/material";
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
      <Typography fontSize={ ["14px", "16px", "18px"] } px={ 1 } variant="body2">
        Buy, sell and trade streaming royalty rights alongside your favorite
        artists.
      </Typography>
    </Stack>
  );
};

export default LaunchBanner;
