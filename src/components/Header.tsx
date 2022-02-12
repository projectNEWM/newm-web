import { Collapse, Grid, Grow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ArtistProfile } from "./ArtistProfile";
import { NEWMLogo } from "./NEWMLogo";
import { Artist } from "../models/artist";

interface HeaderProps {
  artist: Artist;
}

export const Header = ({ artist }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);



  useEffect(() => {

    const listenToScroll = () => {
  
      const heightToHideFrom = 50;
      const winScroll = document.getElementById("songs")?.scrollTop;
      // eslint-disable-next-line no-console
      console.log(winScroll); 
  
  
      if (winScroll && winScroll > heightToHideFrom) {
        isVisible && setIsVisible(false); // to limit setting state only the first time
      } else {
        setIsVisible(true);
      }
    };
    document && document.getElementById("songs")?.addEventListener("scroll", listenToScroll);


    return () => document.getElementById("songs")?.addEventListener("scroll", listenToScroll);
  }, [isVisible]);

  
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
            <Collapse in={isVisible} unmountOnExit>
                  <Typography variant="body1">{artist.bio}</Typography>
            </Collapse> 
            
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

