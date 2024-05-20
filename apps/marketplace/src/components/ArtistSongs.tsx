import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale/api";

const ArtistSongs: FunctionComponent = () => {
  // TODO: limit results by artist ID once artist page references API data
  const { isLoading, data = [] } = useGetSalesQuery();

  return (
    <Box mt={ 7 }>
      <Sales hasTitle={ false } isLoading={ isLoading } sales={ data } />
    </Box>
  );
};

export default ArtistSongs;
