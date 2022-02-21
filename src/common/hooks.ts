import { useLayoutEffect, useState } from "react";

export interface WindowDimensions {
  height: number;
  width: number;
}

const hasWindow = typeof window !== "undefined";

const getWindowDimensions = () => {
  const width = hasWindow ? window.innerWidth : null;
  const height = hasWindow ? window.innerHeight : null;

  return { height, width } as WindowDimensions;
};

export const useWindowDimensions = (): WindowDimensions | undefined => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useLayoutEffect(
    () => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      if (hasWindow) {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    },
    [windowDimensions]
  );

  return windowDimensions;
};
