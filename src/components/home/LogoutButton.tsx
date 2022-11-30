import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack } from "@mui/material";
import LogoutIcon from "assets/images/LogoutIcon";
import { logOut, selectSession } from "modules/session";
import theme from "theme";

const activeBackground = "rgba(255, 255, 255, 0.1)";

const LogoutButton: FunctionComponent = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  const { isLoggedIn } = useSelector(selectSession);

  return isLoggedIn ? (
    <Button
      onClick={ handleLogout }
      sx={ {
        minWidth: "100%",
        fontSize: "12px",
        lineHeight: "15px",
        fontWeight: 600,
        font: theme.typography.button.font,
        alignItems: "center",
        borderRadius: "6px",
        padding: "12px 20px",
        color: "white",
        background: "transparent",
        opacity: 0.5,
        transition: "background-color 0ms",
        display: "flex",
        textDecoration: "none",
        textTransform: "none",
        justifyContent: "flex-start",
        "&:hover": {
          opacity: "1",
          background: `${activeBackground}`,
        },
      } }
    >
      <Stack direction="row" spacing={ 2.5 } data-testid="navStyled">
        <LogoutIcon />
        <span>LOG OUT</span>
      </Stack>
    </Button>
  ) : null;
};

export default LogoutButton;
