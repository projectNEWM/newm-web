import { Box, Collapse, Grid, Typography } from "@mui/material";
import { Artist } from "modules/song";
import { useState } from "react";
import ArtistProfile from "./ArtistProfile";
import NEWMLogo from "./NEWMLogo";

interface HeaderProps {
  artist: Artist;
}

const Header = ({ artist }: HeaderProps) => {
  const [isTextVisible, setIsTextVisible] = useState(true);
  document.onreadystatechange = function () {
    document.getElementById("content")?.addEventListener("scroll", listenToScroll);
  };
  const listenToScroll = () => {
    const heightToHideFrom = 37;
    const winScroll = document.getElementById("content")?.scrollTop;

    if (winScroll && winScroll > heightToHideFrom) {
      isTextVisible && setIsTextVisible(false); // to limit setting state only the first time
    } else {
      setIsTextVisible(true);
    }
  };

  return (
    <Box pt={ 1.75 }>
      <Grid container spacing={ 2 }>
        <Box
          component={ Grid }
          item xs={ 3 }
          display={ { sm: "block", xs: "none" } }
        >
          <NEWMLogo />
        </Box>

        <Grid item xs={ 12 } sm={ 6 }>
          <ArtistProfile artist={ artist } />
        </Grid>
        <Grid item xs={ 12 }>
          <div
            style={ {
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              width: "829px",
            } }
          >
            <Collapse in={ isTextVisible } unmountOnExit easing={ "linear" } timeout={ 300 }>
                  <Box
                    maxHeight={ 85 }
                    overflow="scroll"
                    textOverflow="scroll"
                  >
                    <Typography data-testid="artistBio" id="artistBio" variant="body1">{ artist.bio }</Typography>
                  </Box>
            </Collapse>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
