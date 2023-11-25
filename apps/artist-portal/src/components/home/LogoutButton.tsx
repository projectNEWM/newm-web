import { FunctionComponent } from "react";
import { logOut, selectSession } from "modules/session";
import { Button, Typography } from "elements";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "common";

const LogoutButton: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector(selectSession);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return isLoggedIn ? (
    <Button variant="outlined" width="compact" onClick={ handleLogout }>
      <LogoutIcon sx={ { mr: 1 } } /> <Typography>Log out</Typography>
    </Button>
  ) : null;
};

export default LogoutButton;
