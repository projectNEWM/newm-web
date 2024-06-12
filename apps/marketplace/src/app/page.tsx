"use client";
import { FunctionComponent } from "react";
import { Container } from "@mui/material";
import { useNum } from "@newm-web/audio";
import { ArtistSpotlight, RecentSongs } from "../components";

const Home: FunctionComponent = () => {
  const { num, increment } = useNum();

  return (
    <Container sx={ { flexGrow: 1 } }>
      <h4>{ num }</h4>
      <button onClick={ increment }>Increment</button>

      <RecentSongs />

      <ArtistSpotlight />
    </Container>
  );
};

export default Home;
