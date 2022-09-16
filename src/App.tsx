import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Background, InitializeWallet, Toast } from "components";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import theme from "theme";
import TokenDrop from "pages/tokenDrop/TokenDrop";
import ScrollToTopOnNavigation from "components/ScrollToTopOnNavigation";
import store from "./store";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <Toast />
        <CssBaseline />
        <InitializeWallet />

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
      </Provider>
    </ThemeProvider>
  );
};

export default App;
