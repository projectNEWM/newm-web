import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ReactElement } from "react";
import theme from "@newm-web/theme";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { WrapperProps } from "@newm-web/utils";
import { RenderProps } from "./types";
import { reducer } from "../store";

/**
 * Wraps the element being tested with Theme, Provider, and
 * Router context so that it is available in tests.
 *
 * @example
 *
 * const renderProps = renderWithContext(
 *   <Example />,
 *   { preloadedState: { hello: "world" } }),
 * );
 */
export const renderWithContext = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({ preloadedState, reducer }),
    ...renderOptions
  }: RenderProps = {
    preloadedState: {},
    store: configureStore({ reducer }),
  }
) => {
  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <ThemeProvider theme={ theme }>
        <GoogleOAuthProvider clientId="">
          <Provider store={ store }>
            <BrowserRouter>{ children }</BrowserRouter>
          </Provider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
