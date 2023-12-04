import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  Background,
  ConnectWalletModal,
  IdenfyFailSession,
  IdenfyModal,
  IdenfyPingUserStatus,
  IdenfySuccessSession,
  InvitesModal,
  PrivateRoute,
  ProgressBarModal,
  Toast,
  UpdateWalletAddressModal,
  WalletEnvMismatchModal,
} from "./components";
import Login from "./pages/login";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import ForgotPassword from "./pages/forgotPassword";
import CreateProfile from "./pages/createProfile";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import theme from "@newm-web/theme";
import BrowserRouter from "./common/BrowserRouter";
import { history } from "./common/history";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import OnboardingRedirect from "./components/OnboardingRedirect";
import store, { persistor } from "./store";
import { VITE_GOOGLE_CLIENT_ID } from "@newm-web/env";
import "./App.css";

const App = () => {
  const googleClientID = VITE_GOOGLE_CLIENT_ID || "";

  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId={googleClientID}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toast />
            <CssBaseline />
            <IdenfyPingUserStatus />
            <IdenfyModal />
            <ConnectWalletModal />
            <InvitesModal />
            <ProgressBarModal />
            <UpdateWalletAddressModal />
            <WalletEnvMismatchModal />

            <Background>
              <BrowserRouter history={history}>
                <OnboardingRedirect />

                <Routes>
                  <Route path="/" element={<Navigate to="home" replace />} />

                  <Route path="linkedin" element={<LinkedInCallback />} />

                  <Route path="login" element={<Login />} />

                  <Route
                    path="forgot-password/*"
                    element={<ForgotPassword />}
                  />

                  <Route path="sign-up/*" element={<SignUp />} />

                  <Route
                    path="idenfy-success-session"
                    element={<IdenfySuccessSession />}
                  />

                  <Route
                    path="idenfy-fail-session"
                    element={<IdenfyFailSession />}
                  />

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
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};

export default App;
