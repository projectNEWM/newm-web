"use client";
import "../global.css";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { FunctionComponent, ReactNode } from "react";
import theme from "@newm-web/theme";
import { Provider } from "react-redux";
import { Footer, StyledComponentsRegistry } from "../components";
import store from "../store";

interface RootLayoutProps {
  readonly children: ReactNode;
}

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href={
            "https://fonts.googleapis.com/css2?" +
            "family=DM+Serif+Text:ital@0;1&" +
            "family=Inter:wght@400;500;600;700;800&" +
            "family=Raleway:wght@400;500;600;700;800&" +
            "display=swap"
          }
          rel="stylesheet"
        />
      </head>

      <body
        style={ {
          backgroundColor: theme.colors.black,
        } }
      >
        <StyledComponentsRegistry>
          <AppRouterCacheProvider options={ { enableCssLayer: true } }>
            <Provider store={ store }>
              <ThemeProvider theme={ theme }>
                { children }
                <Footer />
              </ThemeProvider>
            </Provider>
          </AppRouterCacheProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
