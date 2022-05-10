import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Typography } from "elements";

const Profile: FunctionComponent = () => {
  return (
    <Box
      display="flex"
      flexGrow={ 1 }
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Profile page</Typography>
    </Box>
  );
};

export default Profile;
