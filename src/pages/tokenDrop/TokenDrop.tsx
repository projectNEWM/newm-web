import { Box, Container, Stack } from "@mui/material";
import { Typography } from "elements";
import { FunctionComponent } from "react";
import theme from "theme";
import mursProfileImageLg from "assets/images/murs-profile-cut-tinified.png";
import mursProfileImageSm from "assets/images/murs-profile-cropped.png";
import { useWindowDimensions } from "common";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Landing from "./Landing";
import Purchase from "./Payment";

const TokenDrop: FunctionComponent = () => {
  const { width = 0 } = useWindowDimensions() || {};

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black100,
        flexDirection: "column",
        flexGrow: 1,
      } }
    >
      <Box
        sx={ {
          display: ["none", "none", "flex"],
          position: "fixed",
          bottom: 0,
          right: 0,
          height: ["100%", "100%", width * 0.5, "100%"],
        } }
      >
        <img
          alt="murs profile"
          src={ mursProfileImageLg }
          style={ { height: "100%" } }
        />
      </Box>

      <Box
        sx={ {
          display: ["flex", "flex", "none"],
        } }
      >
        <img
          alt="murs profile"
          src={ mursProfileImageSm }
          style={ { width: "100%" } }
        />
      </Box>

      <Container maxWidth={ false }>
        <Box
          width={ ["100%", "100%", "60%"] }
          maxWidth="680px"
          paddingTop={ [4, 4, 12] }
          paddingLeft={ [1, 1, 10] }
          paddingRight={ [1, 1, 0] }
        >
          <Stack spacing={ 1 } sx={ { marginBottom: 4 } }>
            <Typography variant="h1" fontSize={ 100 } lineHeight="80px">
              MURS
            </Typography>

            <Typography
              variant="h3"
              color="pink"
              sx={ theme.typography.emphasized }
            >
              Moodswingz Cryptomedia Group
            </Typography>
          </Stack>

          <Routes>
            <Route path="" element={ <Landing /> } />
            <Route path="payment" element={ <Purchase /> } />

            <Route path="*" element={ <Navigate to="" replace /> } />
          </Routes>
        </Box>
      </Container>

      <Box sx={ { position: "fixed", left: 0, bottom: 0, right: 0 } }>
        <Footer />
      </Box>
    </Box>
  );
};

export default TokenDrop;
