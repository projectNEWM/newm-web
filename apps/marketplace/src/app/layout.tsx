"use client";
import "../global.css";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { FunctionComponent, ReactNode } from "react";
import theme from "@newm-web/theme";
import Header from "../components/Header";

interface RootLayoutProps {
  readonly children: ReactNode;
}

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body style={ { backgroundColor: theme.colors.black } }>
        <AppRouterCacheProvider options={ { enableCssLayer: true } }>
          <ThemeProvider theme={ theme }>
            <Header />
            { children }
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
