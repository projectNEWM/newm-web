"use client";
import { FunctionComponent, ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Container, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { NEWMLogo } from "@newm-web/assets";
import {
  LDProvider,
  Maintenance,
  StyledComponentsRegistry,
} from "@newm-web/components";
import theme from "@newm-web/theme";
import "global.css";

interface RootLayoutProps {
  readonly children: ReactNode;
}

// Define context for LaunchDarkly
const ldContext = { anonymous: true, kind: "user", name: "Tools Guest" };

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>NEWM Tools</title>
        <meta
          content="Elevate your NEWM music experience with these set of tools."
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
            <ThemeProvider theme={ theme }>
              <CssBaseline />
              <LDProvider context={ ldContext }>
                <Maintenance flagName="webToolsMaintenanceMode">
                  <Container sx={ { mt: 5, textAlign: "center" } }>
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
          </AppRouterCacheProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
