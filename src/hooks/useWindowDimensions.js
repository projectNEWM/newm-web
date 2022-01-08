import { useEffect, useState } from "react";

export default function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";
  // TODO update these so that the dependencies for the hook dont
  // change on every render
  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      height,
      width
    };
  }

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(
    () => {
      if (hasWindow) {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    },
    [getWindowDimensions, handleResize, hasWindow]
  );

  return windowDimensions;
}
