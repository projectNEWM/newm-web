import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import "./App.css";

// Design: https://xd.adobe.com/view/2cb4c8ee-234a-46cc-b2d2-683e9ae7031c-79e7/

const StyledBackground = styled("div")({
  backgroundImage: "url(\"https://i.postimg.cc/TPTmSRWB/bg-img.png\")",
  backgroundPosition: "center",
  backgroundRepeat: "repeat",
  backgroundSize: "cover",
  height: "100%",
  left: 0,
  position: "absolute",
  width: "100%"
});

const theme = createTheme({
  palette: {
    background: {
      default: "#0A0A0A",
      paper: "#0A0A0A"
    },
    primary: {
      main: "#CC33CC"
    },
    secondary: {
      main: "#CC33CC"
    },
    text: {
      primary: "#FFFFFF",
      purple: "#CC33CC",
      secondary: "#707070"
    }
  },
  typography: {
    body1: {
      fontFamily: "Montserrat",
      fontSize: 14
    },
    button: {
      textTransform: "none"
    },
    fontFamily: "Montserrat",
    fontSize: 14,
    formHeader: {
      fontFamily: "Raleway",
      fontSize: 16,
      fontWeight: 900
    },
    h2: {
      fontFamily: "Raleway",
      fontSize: 30,
      fontWeight: 600
    },
    h6: {
      fontFamily: "Roboto",
      fontSize: 12
    },
    tabs: {
      fontFamily: "Raleway",
      fontSize: 14,
      fontWeight: 900
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <StyledBackground>
        <Header />
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/home/songs" />
            <Redirect exact from="/home" to="/home/songs" />
            <Route path="/home/:page?" render={ props => <Content { ...props } /> } />
          </Switch>
        </BrowserRouter>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
