"use client";
import { FunctionComponent } from "react";
import { Box, Container } from "@mui/material";
import { ArtistSpotlight, Sales } from "../components";
import { useGetSalesQuery } from "../modules/sale";

const Home: FunctionComponent = () => {
  const { data, isLoading } = useGetSalesQuery({
    limit: 8,
    sortOrder: "desc",
  });

  return (
    <Container sx={ { flexGrow: 1 } }>
      <Box mt={ [7.5, 5.5, 10] }>
        <Sales isLoading={ isLoading } sales={ data } title="JUST RELEASED" />
      </Box>

      <ArtistSpotlight />
    </Container>
  );
};

export default Home;
