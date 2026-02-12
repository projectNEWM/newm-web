import { useEffect, useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useMediaQuery, useTheme } from "@mui/material";

import { selectSession } from "../modules/session";
import type { AppDispatch, RootState } from "../store";

/**
 * Use instead of useDispatch to ensure dispatch is typed correctly
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Use instead of useSelector to ensure it is typed correctly
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Redirects the user to their prior route, or home,
 * once authenticated.
 */

export const useAuthenticatedRedirect = () => {
  const { isLoggedIn } = useAppSelector(selectSession);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const previousRoute = location?.state?.from;
      navigate(previousRoute || "/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
};

export const useBreakpoint = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = !isDesktop;

  return useMemo(() => ({ isDesktop, isMobile }), [isDesktop, isMobile]);
};
