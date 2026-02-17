import { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut, selectSession } from "../../modules/session";
import { useAppDispatch, useAppSelector } from "../../common";

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
