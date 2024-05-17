import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale";

interface SimilarSongsProps {
  readonly currentArtistId?: string;
  readonly currentSaleId?: string;
  readonly genres?: ReadonlyArray<string>;
}

const SimilarSongs: FunctionComponent<SimilarSongsProps> = ({
  genres,
  currentArtistId,
  currentSaleId,
}) => {
  const { isLoading, data = [] } = useGetSalesQuery({ genres });

  // TODO: filter out these sales using query param when back-end updated
  const filteredSales = data.filter(({ id, song: { artistId } }) => {
    return id !== currentSaleId && artistId !== currentArtistId;
  });

  return (
    <Box mb={ 8 } mt={ 16 }>
      <Sales
        isLoading={ isLoading }
        sales={ filteredSales }
        title="SIMILAR SONGS"
      />
    </Box>
  );
};

export default SimilarSongs;
