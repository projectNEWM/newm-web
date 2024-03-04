"use client";
import { FunctionComponent } from "react";
import { Container } from "@mui/material";
import { ArtistSpotlight, Songs } from "../components";

const Home: FunctionComponent = () => {
  return (
    <Container sx={ { flexGrow: 1 } }>
      <Songs />
      <ArtistSpotlight />
    </Container>
  );
};

export default Home;
