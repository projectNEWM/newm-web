"use client";
import { FunctionComponent } from "react";
import { Container } from "@mui/material";
import Songs from "../components/Songs";

const Home: FunctionComponent = () => {
  return (
    <Container sx={ { flexGrow: 1 } }>
      <Songs />
    </Container>
  );
};

export default Home;
