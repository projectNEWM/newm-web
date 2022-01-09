import { useEffect, useState } from "react";

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({});

  useEffect(
    () => {
      const hasWindow = typeof window !== "undefined";

      function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
          height,
          width,
        };
      }

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
}
