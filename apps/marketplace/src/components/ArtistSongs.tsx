import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale/api";
import { SaleStatus } from "../modules/sale";

interface ArtistSongsProps {
  readonly artistId: string;
}

const ArtistSongs: FunctionComponent<ArtistSongsProps> = ({ artistId }) => {
  const { isLoading, data = [] } = useGetSalesQuery({
    artistIds: [artistId],
    statuses: [SaleStatus.Started],
  });

  return (
    <Box mt={ 7 }>
      <Sales hasTitle={ false } isLoading={ isLoading } sales={ data } />
    </Box>
  );
};

export default ArtistSongs;
