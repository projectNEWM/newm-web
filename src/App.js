import "./App.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Route, Switch, Redirect } from "react-router-dom";

import { Header } from "./components/header";
import { Content } from "./components/content";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

// Design: https://xd.adobe.com/view/2cb4c8ee-234a-46cc-b2d2-683e9ae7031c-79e7/

const StyledBackground = styled("div")({
  backgroundImage: `url("https://i.postimg.cc/TPTmSRWB/bg-img.png")`,
  height: "100%",
  position: "absolute",
  left: 0,
  width: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "repeat",
  backgroundSize: "cover",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#CC33CC",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#707070",
      purple: "#CC33CC",
    },
    background: {
      default: "#0A0A0A",
      paper: "#0A0A0A",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontSize: 14,
    body1: {
      fontFamily: "Montserrat",
      fontSize: 14,
    },
    h2: {
      fontFamily: "Raleway",
      fontSize: 30,
      fontWeight: 600,
    },

    h6: {
      fontFamily: "Roboto",
      fontSize: 12,
    },
    tabs: {
      fontFamily: "Raleway",
      fontSize: 14,
      fontWeight: 900,
    },
    formHeader: {
      fontFamily: "Raleway",
      fontSize: 16,
      fontWeight: 900,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledBackground>
        <Header />
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/home/songs" />
            <Redirect exact from="/home" to="/home/songs" />
            <Route
              path="/home/:page?"
              render={(props) => <Content {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
