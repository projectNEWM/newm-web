"use client";
import { FunctionComponent } from "react";
import { Container } from "@mui/material";
import { ArtistSpotlight, RecentSongs } from "../components";

const Home: FunctionComponent = () => {
  return (
    <Container sx={ { flexGrow: 1 } }>
      <RecentSongs />

      <ArtistSpotlight />
    </Container>
  );
};

export default Home;
