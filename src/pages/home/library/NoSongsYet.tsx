import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Typography } from "elements";
import Owner from "assets/images/Owner";

const NoSongsYet: FunctionComponent = () => {
  return (
    <Box
      sx={ {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      } }
    >
      <Owner />

      <Typography fontWeight="bold" fontSize="16px">
        There are no owners yet.
      </Typography>
      <Typography fontWeight="regular" fontSize="14x">
        As soon as someone owns part of your songs, they’ll be listed here.
      </Typography>
    </Box>
  );
};

export default NoSongsYet;
