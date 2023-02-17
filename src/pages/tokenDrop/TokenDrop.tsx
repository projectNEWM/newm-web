import { Box, Container, Stack } from "@mui/material";
import { Typography } from "elements";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import theme from "theme";
import artistAssets from "assets/artists";
import { useWindowDimensions } from "common";
import { Navigate, Route, Routes } from "react-router-dom";
import NEWMLogo from "assets/images/NEWMLogo";
import { useGetSaleBundlesQuery } from "modules/sale";
import { projectDetails } from "buildParams";
import { getShouldDisplayCountdown } from "modules/ui";
import { useDispatch } from "react-redux";
import { getAdaUsdRate } from "modules/wallet";
import Footer from "./Footer";
import Landing from "./Landing";
import Purchase from "./Payment";
import Congratulations from "./Congratulations";
import Soldout from "./Soldout";
import Countdown from "./Countdown";

const TokenDrop: FunctionComponent = () => {
  const { refetch } = useGetSaleBundlesQuery();

  const dispatch = useDispatch();

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
      // refetch if countdown was being displayed
      if (displayCountdown) refetch();

      setDisplayCountdown(false);
    }
  }, [refetch, displayCountdown]);

  useEffect(() => {
    handleSetDisplayCountdown();
  }, [handleSetDisplayCountdown]);

  useEffect(() => {
    dispatch(getAdaUsdRate());
  }, [dispatch]);

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
              fontSize={ ["42px", "70px", "78px", "100px"] }
              lineHeight="86px"
              paddingRight={ [0, 0, 18] }
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
                <Route path="sold-out" element={ <Soldout /> } />

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
