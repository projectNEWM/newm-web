import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Toast } from "components";
import Congratulations from "pages/sampleSale/Congratulations";
import Landing from "pages/sampleSale/Landing";
import SampleSale from "pages/sampleSale";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import theme from "theme";
import "./App.css";
import store from "./store";

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <Toast />
        <CssBaseline />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Landing /> } />
            <Route path="*" element={ <Navigate to="/" replace /> } />
            <Route path="sample-sale/*" element={ <SampleSale /> } />
            <Route
              path="sample-sale/congratulations"
              element={ <Congratulations /> }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
