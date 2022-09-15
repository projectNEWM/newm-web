import { Box, Container, Stack } from "@mui/material";
import { Typography } from "elements";
import { FunctionComponent } from "react";
import theme from "theme";
import mursProfileImageLg from "assets/images/murs-profile-cut-tinified.png";
import mursProfileImageSm from "assets/images/murs-profile-cropped.png";
import { useWindowDimensions } from "common";
import { Navigate, Route, Routes } from "react-router-dom";
import NEWMLogo from "assets/images/NEWMLogo";
import Footer from "./Footer";
import Landing from "./Landing";
import Purchase from "./Payment";
import Congratulations from "./Congratulations";

const TokenDrop: FunctionComponent = () => {
  const window = useWindowDimensions();

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
          position: "absolute",
          top: 32,
          right: [0, 0, 32, 160],
        } }
      >
        <NEWMLogo width={ 110 } height={ 110 } />
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
          maxWidth={ [9999, 9999, 680] }
          paddingTop={ [4, 4, 6] }
          paddingLeft={ [1, 1, 10] }
          paddingRight={ [1, 1, 0] }
        >
          <Stack spacing={ 1 } sx={ { marginBottom: 1 } }>
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
            <Route path="congratulations" element={ <Congratulations /> } />

            <Route path="*" element={ <Navigate to="" replace /> } />
          </Routes>
        </Box>
      </Container>

      <Box sx={ { mt: 3, position: "relative", zIndex: 999 } }>
        <Box
          sx={ {
            display: ["none", "none", "block"],
            position: "fixed",
            bottom: 0,
            right: 0,
            height: [
              window.height,
              window.height,
              window.width * 0.5,
              window.height,
            ],
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
            position: "relative",
            zIndex: 9999,
            backgroundColor: theme.colors.black100,
            borderTop: `1px solid ${theme.colors.grey600}`,
          } }
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default TokenDrop;
