"use client";
import { ComponentType, FC, ReactNode, useEffect, useState } from "react";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { LDContext } from "launchdarkly-js-sdk-common";
import { LDOptions } from "launchdarkly-js-client-sdk";
import { LAUNCHDARKLY_CLIENT_ID } from "@newm-web/env";
import theme from "@newm-web/theme";

interface LDProviderProps {
  children: ReactNode;
  context: LDContext;
  options?: LDOptions;
}

const LDProvider: FC<LDProviderProps> = ({ children, context, options }) => {
  const [LDClientProvider, setLDClientProvider] = useState<ComponentType<{
    children: ReactNode;
  }> | null>(null);

  useEffect(() => {
    let isMounted = true;
    asyncWithLDProvider({
      clientSideID: LAUNCHDARKLY_CLIENT_ID,
      context,
      options,
      timeout: 5,
    }).then((Provider) => {
      if (isMounted) {
        setLDClientProvider(() => Provider);
      }
    });

    // Cleanup function to prevent state updates if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [context, options]);

  // Render a fallback while waiting for the provider to load
  if (!LDClientProvider) {
    return (
      <div
        style={ {
          backgroundColor: theme.colors.black,
          height: "100vh",
          width: "100vw",
        } }
      ></div>
    );
  }

  // Render the provider with the children
  return <LDClientProvider>{ children }</LDClientProvider>;
};

export default LDProvider;
