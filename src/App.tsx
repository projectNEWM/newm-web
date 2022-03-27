import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { PrivateRoute } from "components";
import { Background } from "components";
import Login from "pages/login";
import Home from "pages/home";
import SignUp from "pages/signUp";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import store from "./store";
import theme from "./theme";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <CssBaseline />

        <Background>
          <BrowserRouter>
            <Switch>
              <Redirect exact to="/home" from="/" />

              <Route exact path="/linkedin" component={ LinkedInCallback } />

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/sign-up">
                <SignUp />
              </Route>

              <PrivateRoute path="/home">
                <Home />
              </PrivateRoute>
            </Switch>
          </BrowserRouter>
        </Background>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
