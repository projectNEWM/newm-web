"use client";
import { FunctionComponent } from "react";
import { Container } from "@mui/material";
import Songs from "../components/Songs";
import ArtistSpotlight from "../components/ArtistSpotlight";

const Home: FunctionComponent = () => {
  return (
    <Container sx={ { flexGrow: 1 } }>
      <Songs />
      <ArtistSpotlight />
    </Container>
  );
};

export default Home;
