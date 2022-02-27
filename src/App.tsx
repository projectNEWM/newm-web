import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Background, Header } from "pages/app";
import Home from "pages/home";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import store from "./store";
import theme from "./theme";
import "./App.css";

// Design: https://xd.adobe.com/view/2cb4c8ee-234a-46cc-b2d2-683e9ae7031c-79e7/

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
  roles: "Singer, Producer"
};

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <CssBaseline />

        <Background>
          <Header artist={ artist } />

          <BrowserRouter>
            <Switch>
              <Redirect exact from="/" to="/home/songs" />
              <Redirect exact from="/home" to="/home/songs" />
              <Route
                path="/home/:page?"
                render={ ({ match, history, ...otherProps }) => (
                  <Home
                    page={ match.params.page }
                    history={ history }
                    { ...otherProps }
                  />
                ) }
              />
            </Switch>
          </BrowserRouter>
        </Background>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
