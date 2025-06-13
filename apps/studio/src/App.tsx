import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import theme from "@newm-web/theme";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  GOOGLE_CLIENT_ID,
  REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID,
} from "@newm-web/env";
import {
  LDProvider,
  Maintenance,
  UnsupportedBrowserBanner,
} from "@newm-web/components";
import {
  Background,
  ConnectWalletModal,
  IdenfyFailSession,
  IdenfyModal,
  IdenfyPingUserStatus,
  IdenfySuccessSession,
  InvitesModal,
  PingEarningsInProgressWrapper,
  PingSaleEnd,
  PingSaleStart,
  PrivateRoute,
  ProgressBarModal,
  ReferralDashboard,
  Toast,
  UpdateWalletAddressModal,
  WalletEnvMismatchModal,
} from "./components";
import Login from "./pages/login";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import ForgotPassword from "./pages/forgotPassword";
import CreateProfile from "./pages/createProfile";
import NotFoundPage from "./pages/NotFoundPage";
import BrowserRouter from "./common/BrowserRouter";
import { history } from "./common/history";
import OnboardingRedirect from "./components/OnboardingRedirect";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ScrollToTop from "./components/ScrollToTop";
import store, { persistor } from "./store";
import "./App.css";
import LDUserUpdater from "./components/LDUserUpdater";
import PingSaleComplete from "./components/sales/PingSaleComplete";

const App = () => {
  const googleClientID = GOOGLE_CLIENT_ID;
  // Define context for LaunchDarkly
  const ldContext = {
    anonymous: true,
    kind: "user",
    name: "Studio Guest",
  };

  return (
    <ThemeProvider theme={ theme }>
      <GoogleOAuthProvider clientId={ googleClientID }>
        <LDProvider context={ ldContext }>
          <Maintenance flagName="webStudioMaintenanceMode">
            <Provider store={ store }>
              <PersistGate loading={ null } persistor={ persistor }>
                <Toast />
                <CssBaseline />
                <IdenfyPingUserStatus />
                <IdenfyModal />
                <ConnectWalletModal />
                <ReferralDashboard
                  campaignUUID={ REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID }
                />
                <InvitesModal />
                <ProgressBarModal />
                <UpdateWalletAddressModal />
                <WalletEnvMismatchModal />
                <PingSaleStart />
                <PingSaleEnd />
                <PingSaleComplete />
                <PingEarningsInProgressWrapper />
                <UnsupportedBrowserBanner />
                <LDUserUpdater />
                <ScrollToTop />

                <Background>
                  <BrowserRouter history={ history }>
                    <GoogleAnalytics />
                    <OnboardingRedirect />

                    <Routes>
                      <Route
                        element={ <Navigate to="home" replace /> }
                        path="/"
                      />

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

                      { /* Catch-all route for 404 Page Not Found */ }
                      <Route element={ <NotFoundPage /> } path="*" />
                    </Routes>
                  </BrowserRouter>
                </Background>
              </PersistGate>
            </Provider>
          </Maintenance>
        </LDProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};

export default App;
