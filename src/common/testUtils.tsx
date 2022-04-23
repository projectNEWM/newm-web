import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ReactElement, ReactNode } from "react";
import { Form, Formik, FormikConfig } from "formik";
import { reducer } from "store";
import theme from "theme";
import { RenderProps, StringMap, WrapperProps } from "./types";

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
    store = configureStore({ reducer, preloadedState }),
    ...renderOptions
  }: RenderProps = {
    preloadedState: {},
    store: configureStore({ reducer }),
  }
) => {
  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <ThemeProvider theme={ theme }>
        <Provider store={ store }>
          <BrowserRouter>{ children }</BrowserRouter>
        </Provider>
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export const withFormik = (
  element: ReactNode,
  props: FormikConfig<StringMap>
) => {
  return (
    <Formik { ...props }>
      <Form>{ element }</Form>
    </Formik>
  );
};
