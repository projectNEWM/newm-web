import { Box, Collapse, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ArtistProfile } from "./ArtistProfile";
import { NEWMLogo } from "./NEWMLogo";
import { Artist } from "../models/artist";

interface HeaderProps {
  artist: Artist;
}

export const Header = ({ artist }: HeaderProps) => {
  const [isTextVisible, setIsTextVisible] = useState(true);

  useEffect(() => {
    const listenToScroll = () => {
      const heightToHideFrom = 37;
      const winScroll = document.getElementById("content")?.scrollTop;
  
      if (winScroll && winScroll > heightToHideFrom) {
        isTextVisible && setIsTextVisible(false); // to limit setting state only the first time
      } else {
        setIsTextVisible(true);
      }
    };
    document && document.getElementById("content")?.addEventListener("scroll", listenToScroll);
    return () => document.getElementById("content")?.removeEventListener("scroll", listenToScroll);
  }, [isTextVisible]);

  
  return (
    <div>
      <Grid container spacing={ 2 }>
        <NEWMLogo />
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
                  <Box maxHeight={ 85 } overflow="scroll" textOverflow="scroll">
                    <Typography id="artistBio" variant="body1">{ artist.bio }</Typography>
                  </Box>
            </Collapse> 
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

