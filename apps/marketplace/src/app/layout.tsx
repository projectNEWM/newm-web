"use client";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { FunctionComponent, ReactNode } from "react";
import theme from "@newm-web/theme";
import { Provider } from "react-redux";
import { AudioProvider } from "@newm-web/audio";
import "global.css";
import "../app.css";
import {
  LDProvider,
  Maintenance,
  StyledComponentsRegistry,
  UnsupportedBrowserBanner,
} from "@newm-web/components";
import { Footer, Header, PingEarningsInProgressWrapper } from "../components";
import store from "../store";
import Toast from "../components/Toast";

interface RootLayoutProps {
  readonly children: ReactNode;
}

// Define context for LaunchDarkly
const ldContext = { anonymous: true, kind: "user", name: "Marketplace Guest" };

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>NEWM Marketplace</title>
        <meta content="noindex" name="robots" />
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
                <CssBaseline />
                <LDProvider context={ ldContext }>
                  <Maintenance flagName="webMarketplaceMaintenanceMode">
                    <AudioProvider>
                      <Toast />
                      <UnsupportedBrowserBanner />
                      <PingEarningsInProgressWrapper />

                      <Stack flexGrow={ 1 } justifyContent="space-between">
                        <Stack flex={ 1 } justifyContent="flex-start">
                          <Header />
                          { children }
                        </Stack>
                        <Footer />
                      </Stack>
                    </AudioProvider>
                  </Maintenance>
                </LDProvider>
              </ThemeProvider>
            </Provider>
          </AppRouterCacheProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
