import { FunctionComponent } from "react";
import { GradientTypography, Typography } from "elements";
import { ResponsiveNEWMLogo } from "components";
import { Box, Stack, useTheme } from "@mui/material";

const Congratulations: FunctionComponent = () => {
  const theme = useTheme();
  return (
    <Box
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        maxWidth: "100%",
        pt: 7.5,
        px: 2,
        textAlign: "center",
      } }
    >
      <ResponsiveNEWMLogo />

      <Typography variant="h1" mt={ 4 }>
        Congratulations!
      </Typography>
      <GradientTypography
        id="verificationLabel"
        mt={ 1.5 }
        style={ { ...theme.typography.emphasized } }
        variant="h1"
      >
        You&apos;re now a NEWM pioneer.
      </GradientTypography>
      <Stack maxWidth="580px" mt={ 7.5 } px={ 2.5 } spacing={ 1.5 }>
        <Typography variant="h3">What now?</Typography>
        <Typography fontWeight={ 400 }>
          We are working hard on our Artist Portal. By being a pioneer you will
          be the first to get notified when we launch our Portal and will be
          able to test all of our amazing features. For now, feel free to visit
          our social media.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Congratulations;
