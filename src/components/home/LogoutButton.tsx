import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "assets/images/LogoutIcon";
import { logOut, selectSession } from "modules/session";
import SideBarNavLink from "./SideBarNavLink";

const LogoutButton: FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const { isLoggedIn } = useSelector(selectSession);

  return isLoggedIn ? (
    <SideBarNavLink
      label="LOG OUT"
      icon={ <LogoutIcon /> }
      onClick={ handleLogout }
    />
  ) : null;
};

export default LogoutButton;
