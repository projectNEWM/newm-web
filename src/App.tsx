import { CssBaseline } from "@mui/material";
import { ThemeProvider, styled } from "@mui/material/styles";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Header } from "components";
import Content from "pages/home/Content";
import theme from "theme";
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
  width: "100%",
});

const artist = {
  bio:
    "Oscillating between the worlds of improvisation and composition in her " +
    "practice, Sam holds a Bachelor of Music in Jazz studies from St. " +
    "Francis Xavier University and continues to develop her interests in less " +
    "academic environments. She composes for her solo guitar project, the " +
    "ever- evolving small group project that ranges from duo to quintet and " +
    "for commissions. In the fall of 2020 she was commissioned to write a " +
    "piece for the Upstream. Oscillating between the worlds of improvisation " +
    "and composition in her practice, Sam holds a Bachelor of Music in Jazz " +
    "studies from St. Francis Xavier University and continues to develop her " +
    "interests in less academic environments. She composes for her solo " +
    "guitar project, the ever- evolving small group project that ranges from " +
    "duo to quintet and for commissions. In the fall of 2020 she was " +
    "commissioned to write a piece for the Upstream.",
  name: "Miah Jonez",
  roles: "Singer, Producer",
};

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />

      <StyledBackground>
        <Header artist={ artist } />

        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/home/songs" />
            <Redirect exact from="/home" to="/home/songs" />
            <Route
              path="/home/:page?"
              render={({ match, history, ...otherProps }) => (
                <Content
                  page={ match.params.page }
                  history={ history }
                  { ...otherProps }
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
