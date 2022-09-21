import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  Background,
  InitializeWallet,
  SelectWalletModal,
  Toast,
} from "components";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import theme from "theme";
import TokenDrop from "pages/tokenDrop/TokenDrop";
import ScrollToTopOnNavigation from "components/ScrollToTopOnNavigation";
import { PersistGate } from "redux-persist/integration/react";
import { useInitializeRecaptcha } from "common";
import store, { persistor } from "./store";
import "./App.css";

const App = () => {
  useInitializeRecaptcha();

  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <CssBaseline />
          <InitializeWallet />

          <Toast />
          <SelectWalletModal />

          <Background>
            <BrowserRouter>
              <ScrollToTopOnNavigation>
                <Routes>
                  <Route path="token-drop/*" element={ <TokenDrop /> } />

                  <Route
                    path="*"
                    element={ <Navigate to="token-drop" replace /> }
                  />
                </Routes>
              </ScrollToTopOnNavigation>
            </BrowserRouter>
          </Background>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
