import { Box, Stack, Typography } from "@mui/material";
import { GradientTypography } from "@newm-web/elements";
import { auroraBackground, gradientRing } from "@newm-web/assets";
import theme from "@newm-web/theme";
import Image from "next/image";

const LaunchBanner = () => {
  return (
    <Stack
      alignItems="center"
      display="flex"
      justifyContent="center"
      py={ [5, 8, 12] }
      sx={ {
        backgroundImage: `url(${auroraBackground.src})`,
        backgroundPosition: "center 25%",
        backgroundSize: "cover",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      } }
    >
      <Image
        alt="banner-gradient-ring"
        src={ gradientRing }
        style={ { position: "absolute", zIndex: 20 } }
      />

      <Box
        style={ {
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.5) 100%)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          bottom: 0,
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 10,
        } }
      />

      <Stack
        justifyContent="flex-start"
        maxWidth="100%"
        position="relative"
        px={ 4 }
        textAlign={ ["center", "left", "left"] }
        width={ 750 }
        zIndex={ 100 }
      >
        <Typography
          fontSize={ ["24px", "32px", "48px"] }
          fontWeight={ 800 }
          lineHeight={ ["32px", "42px", "56px"] }
          variant="h1"
        >
          Discover, Support, and Own
        </Typography>
        <GradientTypography
          sx={ {
            ...theme.typography.emphasized,
            fontSize: ["24px", "32px", "48px"],
            fontWeight: 400,
            lineHeight: ["32px", "42px", "65px"],
            px: 0,
          } }
          variant="h1"
        >
          the Music you Love!
        </GradientTypography>
      </Stack>
    </Stack>
  );
};

export default LaunchBanner;
