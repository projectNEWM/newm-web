"use client";
import { FunctionComponent } from "react";
import { Container } from "@mui/material";
import Songs from "../components/Songs";
import Artists from "../components/Artists";

const Home: FunctionComponent = () => {
  return (
    <Container sx={ { flexGrow: 1 } }>
      <Songs />
      <Artists />
    </Container>
  );
};

export default Home;
