"use client";
import { FunctionComponent, ReactNode } from "react";
import dynamic from "next/dynamic";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Provider } from "react-redux";
import { Container, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { NEWMLogo } from "@newm-web/assets";
import theme from "@newm-web/theme";
import "global.css";
import store from "../store";
import { ConnectWallet, Toast } from "../components";

interface RootLayoutProps {
  readonly children: ReactNode;
}

// Dynamically import components
const StyledComponentsRegistry = dynamic(() =>
  import("@newm-web/components").then((mod) => mod.StyledComponentsRegistry)
);
const UnsupportedBrowserBanner = dynamic(() =>
  import("@newm-web/components").then((mod) => mod.UnsupportedBrowserBanner)
);
const LDProvider = dynamic(
  () => import("@newm-web/components").then((mod) => mod.LDProvider),
  { ssr: false }
);
const Maintenance = dynamic(() =>
  import("@newm-web/components").then((mod) => mod.Maintenance)
);

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
