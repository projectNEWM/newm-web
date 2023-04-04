import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectSession } from "modules/session";
import { Button, Typography } from "elements";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton: FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const { isLoggedIn } = useSelector(selectSession);

  return isLoggedIn ? (
    <Button variant="outlined" onClick={ handleLogout } width="compact">
      <LogoutIcon sx={ { mr: 1 } } /> <Typography>Log out</Typography>
    </Button>
  ) : null;
};

export default LogoutButton;
