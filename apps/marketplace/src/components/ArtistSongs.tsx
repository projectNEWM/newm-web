import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { SaleStatus } from "@newm-web/types";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale/api";

interface ArtistSongsProps {
  readonly artistId: string;
}

const ArtistSongs: FunctionComponent<ArtistSongsProps> = ({ artistId }) => {
  const { isLoading, data = [] } = useGetSalesQuery({
    artistIds: [artistId],
    saleStatuses: [SaleStatus.Started],
  });

  return (
    <Box mt={ 7 }>
      <Sales isLoading={ isLoading } sales={ data } />
    </Box>
  );
};

export default ArtistSongs;
