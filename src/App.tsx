import { CssBaseline } from "@mui/material";
import { ThemeProvider, styled } from "@mui/material/styles";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import "./App.css";
import { theme } from "./theme/theme";

// Design: https://xd.adobe.com/view/2cb4c8ee-234a-46cc-b2d2-683e9ae7031c-79e7/

const StyledBackground = styled("div")({
  backgroundImage: "url(\"https://i.postimg.cc/TPTmSRWB/bg-img.png\")",
  backgroundPosition: "center",
  backgroundRepeat: "repeat",
  backgroundSize: "cover",
  height: "100%",
  left: 0,
  position: "absolute",
  width: "100%",
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
            <Route
              path="/home/:page?"
              render={ ({ match, history, ...otherProps }) => (
                <Content page={ match.params.page } history={ history } { ...otherProps } />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
