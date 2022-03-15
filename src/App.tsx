import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppWrapper, Background, Header } from "pages/app";
import Home from "pages/home";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import store from "./store";
import theme from "./theme";
import "./App.css";

// Design: https://xd.adobe.com/view/2cb4c8ee-234a-46cc-b2d2-683e9ae7031c-79e7/

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <AppWrapper>
          <BrowserRouter>
            <CssBaseline />

            <Background />

            <Header />

            <Switch>
              <Redirect exact from="/" to="/home/songs" />
              <Redirect exact from="/home" to="/home/songs" />

              <Route
                path="/home/:page?"
                component={ Home }
              />
            </Switch>
          </BrowserRouter>
        </AppWrapper>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
