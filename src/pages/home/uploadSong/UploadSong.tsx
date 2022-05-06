import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Typography } from "elements";

const UploadSong: FunctionComponent = () => {
  return (
    <Box
      display="flex"
      flexGrow={ 1 }
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Upload song page</Typography>
    </Box>
  );
};

export default UploadSong;
