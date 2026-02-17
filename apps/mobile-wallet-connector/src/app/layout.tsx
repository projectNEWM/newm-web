"use client";
import { FunctionComponent, ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Provider } from "react-redux";
import { Container, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { NEWMLogo } from "@newm-web/assets";
import theme from "@newm-web/theme";
import {
  LDProvider,
  Maintenance,
  StyledComponentsRegistry,
  UnsupportedBrowserBanner,
} from "@newm-web/components";
import "global.css";
import { Favicon } from "@newm-web/elements";
import store from "../store";
import { ConnectWallet, Toast } from "../components";

interface RootLayoutProps {
  readonly children: ReactNode;
}

// Define context for LaunchDarkly
const ldContext = { anonymous: true, kind: "user", name: "Wallet Guest" };

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>NEWM Mobile Wallet Connector</title>
        <meta
          content="Connect your wallet to the NEWM mobile app."
          name="description"
        />
        <Favicon />
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
                  <Maintenance flagName="webWalletMaintenanceMode">
                    <UnsupportedBrowserBanner />
                    <Toast />

                    <Stack
                      alignItems="flex-end"
                      minHeight={ ["68px", "68px", "44px"] }
                      mr={ 5 }
                      mt={ 5 }
                    >
                      <ConnectWallet />
                    </Stack>
                    <Container sx={ { textAlign: "center" } }>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        mb={ 10 }
                        mt={ 2 }
                      >
                        <Stack mb={ 10 }>
                          <NEWMLogo />
                        </Stack>
                        { children }
                      </Stack>
                    </Container>
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
