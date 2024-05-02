import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import Songs from "./Songs";
import { useGetSalesQuery } from "../modules/sale/api";

const ArtistSongs: FunctionComponent = () => {
  const { isLoading, data = [] } = useGetSalesQuery();

  return (
    <Box mt={ 7 }>
      <Songs isLoading={ isLoading } sales={ data } />
    </Box>
  );
};

export default ArtistSongs;
