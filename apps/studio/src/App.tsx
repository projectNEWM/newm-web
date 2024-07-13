import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import theme from "@newm-web/theme";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@newm-web/env";
import {
  Background,
  ConnectWalletModal,
  IdenfyFailSession,
  IdenfyModal,
  IdenfyPingUserStatus,
  IdenfySuccessSession,
  InvitesModal,
  PingPendingSales,
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
import BrowserRouter from "./common/BrowserRouter";
import { history } from "./common/history";
import OnboardingRedirect from "./components/OnboardingRedirect";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ScrollToTop from "./components/ScrollToTop";
import store, { persistor } from "./store";
import "./App.css";

const App = () => {
  const googleClientID = GOOGLE_CLIENT_ID;

  return (
    <ThemeProvider theme={ theme }>
      <GoogleOAuthProvider clientId={ googleClientID }>
        <Provider store={ store }>
          <PersistGate loading={ null } persistor={ persistor }>
            <Toast />
            <CssBaseline />
            <IdenfyPingUserStatus />
            <IdenfyModal />
            <ConnectWalletModal />
            <InvitesModal />
            <ProgressBarModal />
            <UpdateWalletAddressModal />
            <WalletEnvMismatchModal />
            <PingPendingSales />
            <ScrollToTop />

            <Background>
              <BrowserRouter history={ history }>
                <GoogleAnalytics />
                <OnboardingRedirect />

                <Routes>
                  <Route element={ <Navigate to="home" replace /> } path="/" />

                  <Route element={ <Login /> } path="login" />

                  <Route
                    element={ <ForgotPassword /> }
                    path="forgot-password/*"
                  />

                  <Route element={ <SignUp /> } path="sign-up/*" />

                  <Route
                    element={ <IdenfySuccessSession /> }
                    path="idenfy-success-session"
                  />

                  <Route
                    element={ <IdenfyFailSession /> }
                    path="idenfy-fail-session"
                  />

                  <Route
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                    path="home/*"
                  />

                  <Route
                    element={
                      <PrivateRoute>
                        <CreateProfile />
                      </PrivateRoute>
                    }
                    path="create-profile/*"
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
