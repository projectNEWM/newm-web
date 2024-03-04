"use client";
/**
 * This is a registry for styled-components to be used to inject
 * the styles into the head of the document. Suggested here:
 * https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components
 */
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    styledComponentsStyleSheet.instance.clearTag();

    return <>{ styles }</>;
  });

  if (typeof window !== "undefined") return <>{ children }</>;

  return (
    <StyleSheetManager sheet={ styledComponentsStyleSheet.instance }>
      { children }
    </StyleSheetManager>
  );
};
