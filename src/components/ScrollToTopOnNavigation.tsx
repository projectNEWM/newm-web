import { FunctionComponent, ReactElement, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopOnNavigationProps {
  readonly children: ReactElement;
}

const ScrollToTopOnNavigation: FunctionComponent<
  ScrollToTopOnNavigationProps
> = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

export default ScrollToTopOnNavigation;
