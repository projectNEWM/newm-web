"use client";
import { FunctionComponent } from "react";
import { Container, Stack } from "@mui/material";
import { ArtistSpotlight, Header, Songs } from "../components";

const Home: FunctionComponent = () => {
  return (
    <Stack direction="column">
      <Header />

      <Container sx={ { flexGrow: 1 } }>
        <Songs />
        <ArtistSpotlight />
      </Container>
    </Stack>
  );
};

export default Home;
