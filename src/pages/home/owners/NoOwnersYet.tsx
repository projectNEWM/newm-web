import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Typography } from "elements";
import Owner from "assets/images/Owner";

const NoOwnersYet: FunctionComponent = () => {
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
        There are no collaborators yet.
      </Typography>
      <Typography fontWeight="regular" fontSize="14x">
        After minting, the co-creators and co-owners of your songs will appear
        here.
      </Typography>
    </Box>
  );
};

export default NoOwnersYet;
