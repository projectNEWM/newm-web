import { useEffect, useLayoutEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { selectSession } from "modules/session";
import { useNavigate } from "react-router-dom";

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
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useLayoutEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    if (hasWindow) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [windowDimensions]);

  return windowDimensions;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Redirects the user to their prior route, or home,
 * once authenticated.
 */
export const useAuthenticatedRedirect = () => {
  const { isLoggedIn } = useSelector(selectSession);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
};
