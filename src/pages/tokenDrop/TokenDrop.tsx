import { Box, Container, Stack } from "@mui/material";
import { Typography } from "elements";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import theme from "theme";
import artistAssets from "assets/images/artist-assets";
import { useWindowDimensions } from "common";
import { Navigate, Route, Routes } from "react-router-dom";
import NEWMLogo from "assets/images/NEWMLogo";
import { useGetAdaUsdRateQuery } from "modules/wallet";
import { useGetSaleBundlesQuery } from "modules/sale";
import { projectDetails } from "buildParams";
import { getShouldDisplayCountdown } from "modules/ui";
import Footer from "./Footer";
import Landing from "./Landing";
import Purchase from "./Payment";
import Congratulations from "./Congratulations";
import Countdown from "./Countdown";

const TokenDrop: FunctionComponent = () => {
  useGetAdaUsdRateQuery();
  useGetSaleBundlesQuery();

  const window = useWindowDimensions();
  const isXLargeScreen = window.height > 1000 && window.width > 1000;

  const [displayCountdown, setDisplayCountdown] = useState(
    getShouldDisplayCountdown()
  );

  /**
   * If there is time remaining before the sale launch, sets a timeout
   * to check again in a second, otherwise, hides the countdown.
   */
  const handleSetDisplayCountdown = useCallback(() => {
    if (getShouldDisplayCountdown()) {
      setTimeout(handleSetDisplayCountdown, 1000);
    } else {
      setDisplayCountdown(false);
    }
  }, []);

  useEffect(() => {
    handleSetDisplayCountdown();
  }, [handleSetDisplayCountdown]);

  return (
    <Box
      sx={ {
        position: "relative",
        display: "flex",
        backgroundColor: theme.colors.black100,
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "space-between",
      } }
    >
      <Box
        sx={ {
          display: ["none", "none", "flex"],
          position: "fixed",
          top: 32,
          right: [0, 0, 32, 160],
        } }
      >
        <a href="https://www.newm.io" target="_blank" rel="noopener noreferrer">
          <NEWMLogo width={ 110 } height={ 110 } />
        </a>
      </Box>

      <Box
        sx={ {
          display: ["flex", "flex", "none"],
        } }
      >
        <img
          alt="profile"
          src={ artistAssets.profileSecondary }
          style={ { width: "100%" } }
        />
      </Box>

      <Container maxWidth="xl">
        <Box
          paddingTop={ [4, 4, isXLargeScreen ? 12 : 6] }
          paddingLeft={ [1, 1, 10] }
          paddingRight={ [1, 1, 0] }
        >
          <Stack spacing={ 1 } sx={ { marginBottom: 2.5 } }>
            <Typography
              variant="h1"
              fontSize={ ["60px", "100px"] }
              lineHeight="80px"
            >
              { projectDetails.artistName }
            </Typography>

            { !!projectDetails.subtitle && (
              <Typography
                variant="h3"
                color="pink"
                sx={ {
                  ...theme.typography.emphasized,
                  fontSize: ["30px", "60px"],
                  lineHeight: ["30px", "60px"],
                } }
              >
                { projectDetails.subtitle }
              </Typography>
            ) }
          </Stack>

          <Routes>
            { displayCountdown ? (
              <>
                <Route path="" element={ <Countdown /> } />
                <Route path="*" element={ <Navigate to="" replace /> } />
              </>
            ) : (
              <>
                <Route path="" element={ <Landing /> } />
                <Route path="payment" element={ <Purchase /> } />
                <Route path="congratulations" element={ <Congratulations /> } />

                <Route path="*" element={ <Navigate to="" replace /> } />
              </>
            ) }
          </Routes>
        </Box>
      </Container>

      <Box sx={ { mt: 4, position: "relative", zIndex: 999 } }>
        <Box
          sx={ {
            position: "relative",
            zIndex: 9999,
            backgroundColor: theme.colors.black100,
            borderTop: `1px solid ${theme.colors.grey600}`,
          } }
        >
          <Footer />
        </Box>
      </Box>

      <Box
        sx={ {
          pointerEvents: "none",
          display: ["none", "none", "block"],
          position: "fixed",
          bottom: 0,
          right: 0,
          height: [
            window.height,
            window.height,
            window.width * (window.height > 1200 ? 0.75 : 0.475),
            window.height,
          ],
        } }
      >
        <img
          alt="profile"
          src={ artistAssets.profilePrimary }
          style={ { height: "100%" } }
        />
      </Box>
    </Box>
  );
};

export default TokenDrop;
