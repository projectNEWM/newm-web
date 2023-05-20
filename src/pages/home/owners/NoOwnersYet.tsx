import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Button, Typography } from "elements";
import Owner from "assets/images/Owner";
import { useNavigate } from "react-router-dom";

const NoOwnersYet: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={ {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        rowGap: 2,
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
      <Button
        color="music"
        onClick={ () => navigate("/home/upload-song") }
        variant="secondary"
        width="compact"
      >
        Upload your first song
      </Button>
    </Box>
  );
};

export default NoOwnersYet;
