import { FunctionComponent } from "react";
import { Box, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import { Owner } from "@newm-web/assets";
import { useNavigate } from "react-router-dom";

interface NoOwnersYetProps {
  hasSongsUploaded: boolean;
}

const NoOwnersYet: FunctionComponent<NoOwnersYetProps> = ({
  hasSongsUploaded,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={ {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100%",
        rowGap: 2,
      } }
    >
      <Owner />

      <Typography fontSize="16px" fontWeight="bold">
        There are no collaborators yet.
      </Typography>
      <Typography fontSize="14x" fontWeight="regular">
        After minting, the co-creators and co-owners of your songs will appear
        here.
      </Typography>
      <Button
        color="music"
        variant="secondary"
        width="compact"
        onClick={ () => navigate("/home/upload-song") }
      >
        { hasSongsUploaded
          ? "Invite other collaborators"
          : "Upload your first song" }
      </Button>
    </Box>
  );
};

export default NoOwnersYet;
