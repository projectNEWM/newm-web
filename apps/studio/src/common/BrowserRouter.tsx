import React, { FunctionComponent, memo } from "react";
import { History } from "history";
import {
  BrowserRouterProps as NativeBrowserRouterProps,
  Router,
} from "react-router-dom";

export interface BrowserRouterProps
  extends Omit<NativeBrowserRouterProps, "window"> {
  history: History;
}

/**
 * This is a work-around in order to use the `history` object outside of a
 * component with React Router 6. Taken from
 * https://github.com/remix-run/react-router/issues/8264#issuecomment-973920319
 */
const BrowserRouter: FunctionComponent<BrowserRouterProps> = (props) => {
  const { history, ...restProps } = props;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...restProps}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default memo(BrowserRouter);
