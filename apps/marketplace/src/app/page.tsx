"use client";
import { FunctionComponent } from "react";
import { Box, Container } from "@mui/material";
import { ArtistSpotlight, Songs } from "../components";
import { mockSales } from "../temp/data";

const Home: FunctionComponent = () => {
  return (
    <Container sx={ { flexGrow: 1 } }>
      <Box mt={ [7.5, 5.5, 10] }>
        <Songs sales={ mockSales } title="JUST RELEASED" />
      </Box>

      <ArtistSpotlight />
    </Container>
  );
};

export default Home;
