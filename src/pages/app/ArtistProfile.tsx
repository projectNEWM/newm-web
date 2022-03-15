import { Box, Collapse, Typography } from "@mui/material";
import { Artist } from "modules/song";
import { FunctionComponent, useState } from "react";

interface ArtistProfileProps {
  artist: Artist;
}

const ArtistProfile: FunctionComponent<ArtistProfileProps> = ({ artist }) => {
  const [isTextVisible] = useState(true);

  return (
      <Box px={ 3.75 }>
        <Collapse
          in={ isTextVisible }
          unmountOnExit
          easing={ "linear" }
          timeout={ 300 }
        >
          <Box
            maxHeight={ 85 }
            overflow="scroll"
            textOverflow="scroll"
          >
            <Typography
              textAlign="center"
              data-testid="artistBio"
              id="artistBio"
              variant="body1"
            >
              { artist.bio }
            </Typography>
          </Box>
        </Collapse>
      </Box>
  );
};

export default ArtistProfile;
