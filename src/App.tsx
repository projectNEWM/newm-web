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
              <Route path="/" element={ <Navigate to="home" replace /> } />

              <Route path="linkedin" element={ <LinkedInCallback /> } />

              <Route path="login" element={ <Login /> } />

              <Route path="sign-up/*" element={ <SignUp /> } />

              <Route
                path="home/*"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />

              <Route
                path="create-profile/*"
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </Background>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
