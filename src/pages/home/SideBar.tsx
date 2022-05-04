import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Typography } from "elements";
import { useSelector } from "react-redux";
import { selectProfile } from "modules/session";
import { useTheme } from "@mui/material/styles";
import NewmLogoSmInverse from "assets/images/NEWM-logo-sm-inverse";

const SideBar: FunctionComponent = () => {
  const theme = useTheme();

  const profile = useSelector(selectProfile);

  return (
    <Box
      sx={ {
        display: "flex",
        height: "100%",
        width: theme.spacing(28.75),
        background: theme.colors.black,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 1.25,
      } }
    >
      <Box mt={ 3.75 }>
        <Typography variant="md" fontWeight="bold">
          { profile.nickname }
        </Typography>
      </Box>

      <Box px={ 2.5 } pb={ 2.5 } width="100%" justifyContent="flex-start">
        <NewmLogoSmInverse />
      </Box>
    </Box>
  );
};

export default SideBar;
