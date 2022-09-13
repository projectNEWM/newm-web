import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Background, PrivateRoute, Toast } from "components";
import Login from "pages/login";
import Home from "pages/home";
import SignUp from "pages/signUp";
import CreateProfile from "pages/createProfile";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import theme from "theme";
import "./App.css";
import { useEffect } from "react";
import { ensureWallets } from "modules/wallet";
import TokenDrop from "pages/tokenDrop/TokenDrop";
import store from "./store";

const App = () => {
  useEffect(() => {
    ensureWallets();
  }, []);

  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <Toast />
        <CssBaseline />

        <Background>
          <BrowserRouter>
            <Routes>
              <Route path="linkedin" element={ <LinkedInCallback /> } />

              <Route path="sign-up/*" element={ <SignUp /> } />

              <Route path="token-drop/*" element={ <TokenDrop /> } />

              <Route path="*" element={ <Navigate to="token-drop" replace /> } />
            </Routes>
          </BrowserRouter>
        </Background>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
