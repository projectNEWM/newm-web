import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { PrivateRoute } from "components";
import { Background } from "pages/app";
import Login from "pages/login";
import Home from "pages/home";
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
            <Redirect to="/home" from="/" />

            <Switch>
              <Route path="/login">
                <Login />
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
