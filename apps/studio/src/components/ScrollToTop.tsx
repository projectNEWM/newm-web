import { FunctionComponent, useEffect } from "react";
import { history } from "../common/history";

const ScrollToTop: FunctionComponent = () => {
  useEffect(() => {
    const unlisten = history.listen(() => window.scrollTo(0, 0));

    return () => unlisten();
  }, []);

  return null;
};

export default ScrollToTop;
