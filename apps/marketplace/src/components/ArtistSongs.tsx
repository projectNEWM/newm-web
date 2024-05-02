import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale/api";

const ArtistSongs: FunctionComponent = () => {
  const limit = 8;

  // TODO: limit results by artist ID once artist page references API data
  const { isLoading, data = [] } = useGetSalesQuery({ limit });

  return (
    <Box mt={ 7 }>
      <Sales isLoading={ isLoading } limit={ limit } sales={ data } />
    </Box>
  );
};

export default ArtistSongs;
