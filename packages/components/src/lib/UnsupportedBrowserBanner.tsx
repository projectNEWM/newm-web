import { Container, Stack, Typography, useTheme } from "@mui/material";
import { Alert, Button } from "@newm-web/elements";
import { browserName } from "react-device-detect";
import { FunctionComponent, useEffect, useState } from "react";

const UnsupportedBrowserBanner: FunctionComponent = () => {
  const theme = useTheme();

  const [isVisible, setIsVisible] = useState(false);

  const fullSupportBrowsers = ["Chrome", "Brave", "Edge"];
  const limitedSupportBrowsers = ["Firefox"];
  const isFullSupport = fullSupportBrowsers.includes(browserName);
  const isLimitedSupport = limitedSupportBrowsers.includes(browserName);

  const title = isLimitedSupport
    ? "Limited browser support"
    : "Unsupported browser";

  const message = isLimitedSupport
    ? `This browser has limited support for Cardano wallet extensions. Please 
    switch to Brave, Chrome, or Edge for an improved user experience.`
    : `This browser does not currently support Cardano wallet extensions. 
    Please switch to Brave, Chrome, or Edge for an improved user experience.`;

  /**
   * Toggle display after component mounts to avoid Next.js
   * hydration mismatch error.
   */
  useEffect(() => {
    setIsVisible(!isFullSupport);
  }, [isFullSupport]);

  if (!isVisible) return null;

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      position="relative"
      py={ 2 }
      sx={ {
        backgroundColor: theme.colors.grey600,
      } }
      zIndex={ 1000000 }
    >
      <Container maxWidth="lg">
        <Alert
          action={
            <Button
              color="yellow"
              sx={ { textTransform: "none" } }
              variant="outlined"
              onClick={ () => setIsVisible(false) }
            >
              Dismiss
            </Button>
          }
          severity="warning"
        >
          <Stack spacing={ 0.5 }>
            <Typography color={ theme.colors.yellow }>{ title }</Typography>
            <Typography
              color={ theme.colors.yellow }
              fontWeight={ 400 }
              variant="subtitle1"
            >
              { message }
            </Typography>
          </Stack>
        </Alert>
      </Container>
    </Stack>
  );
};

export default UnsupportedBrowserBanner;
