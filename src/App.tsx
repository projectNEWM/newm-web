import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Background, Toast } from "components";
import SignUp from "pages/signUp";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import theme from "theme";
import { useEffect } from "react";
import { ensureWallets } from "modules/wallet";
import TokenDrop from "pages/tokenDrop/TokenDrop";
import store from "./store";
import "./App.css";
import ScrollToTopOnNavigation from "components/ScrollToTopOnNavigation";

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
            <ScrollToTopOnNavigation>
              <Routes>
                <Route path="linkedin" element={ <LinkedInCallback /> } />

                <Route path="sign-up/*" element={ <SignUp /> } />

                <Route path="token-drop/*" element={ <TokenDrop /> } />

                <Route
                  path="*"
                  element={ <Navigate to="token-drop" replace /> }
                />
              </Routes>
            </ScrollToTopOnNavigation>
          </BrowserRouter>
        </Background>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
