import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

import { useFlags } from "launchdarkly-react-client-sdk";

import { Box, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import { Owner } from "@newm-web/assets";

interface NoOwnersYetProps {
  hasSongsUploaded: boolean;
}

const NoOwnersYet: FunctionComponent<NoOwnersYetProps> = ({
  hasSongsUploaded,
}) => {
  // TODO(webStudioAlbumPhaseTwo): Remove flag once flag is retired.
  const { webStudioAlbumPhaseTwo } = useFlags();

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
        onClick={ () =>
          navigate(
            webStudioAlbumPhaseTwo ? "/home/releases/new" : "/home/upload-song"
          )
        }
      >
        { hasSongsUploaded && !webStudioAlbumPhaseTwo
          ? "Invite other collaborators"
          : webStudioAlbumPhaseTwo
          ? "Create your first release"
          : "Upload your first song" }
      </Button>
    </Box>
  );
};

export default NoOwnersYet;
