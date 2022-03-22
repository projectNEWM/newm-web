import { FunctionComponent } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const isLoggedIn = false; // placeholder value until auth is in place

  return (
    <Route
      { ...rest }
      render={ ({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={ {
              pathname: "/login",
              state: { from: location },
            } }
          />
        )
      }
    />
  );
};

export default PrivateRoute;
