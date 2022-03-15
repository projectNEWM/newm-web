import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import artistImage from "assets/images/artist.svg";
import genre from "assets/images/genre.svg";
import NEWMLogo from "assets/images/NEWMLogo";
import { FunctionComponent } from "react";
import { Artist } from "modules/song";
import ArtistProfile from "./ArtistProfile";
import Background from "./Background";
import HeaderTabs from "./HeaderTabs";

const artist: Artist = {
  bio:
    "Oscillating between the worlds of improvisation and composition in her " +
    "practice, Sam holds a Bachelor of Music in Jazz studies from St. " +
    "Francis Xavier University and continues to develop her interests in less " +
    "academic environments. She composes for her solo guitar project, the " +
    "ever- evolving small group project that ranges from duo to quintet and " +
    "for commissions. In the fall of 2020 she was commissioned to write a " +
    "piece for the Upstream. Oscillating between the worlds of improvisation " +
    "and composition in her practice, Sam holds a Bachelor of Music in Jazz " +
    "studies from St. Francis Xavier University and continues to develop her " +
    "interests in less academic environments. She composes for her solo " +
    "guitar project, the ever- evolving small group project that ranges from " +
    "duo to quintet and for commissions. In the fall of 2020 she was " +
    "commissioned to write a piece for the Upstream.",
  name: "Miah Jonez",
  roles: "Singer, Producer",
};

const Header: FunctionComponent = () => {
  return (
    <Box
      sx={ {
        position: "sticky",
        overflow: "hidden",
        overscrollBehavior: "none",
        top: 0,
        width: "100%",
        zIndex: 50,
      } }
    >
      <Background />

      <Box display="flex" flexDirection="column">
        <Box display="flex" flex={ 1 } flexDirection="row" justifyContent="between" alignItems="center">
          <Box sx={ { flex: 0.25, justifyContent: "center", alignItems: "center", display: { xs: "none", md: "flex" } } }>
            <NEWMLogo />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flex={ 1 }
            py={ 2 }
          >
            <Avatar
              alt={ artist.name }
              src={ artistImage }
              sx={ { height: 180, width: 180 } }
            />

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h2">{ artist.name }</Typography>
              <Typography paddingTop={ 1 } paddingBottom={ 1 } variant="h6">
                { artist.roles }
              </Typography>

              <img alt="img" src={ genre } height="30px" width="auto" />
            </Box>
          </Box>

          <Box sx={ { flex: 0.25, display: { xs: "none", md: "flex"} } } />
        </Box>

        <Container maxWidth="md">
          <ArtistProfile artist={ artist } />
        </Container>

        <Container maxWidth="lg">
          <HeaderTabs />
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
