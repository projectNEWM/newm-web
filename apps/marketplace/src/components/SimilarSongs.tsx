import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale";

interface SimilarSongsProps {
  readonly currentSaleId?: string;
  readonly genres?: ReadonlyArray<string>;
}

const SimilarSongs: FunctionComponent<SimilarSongsProps> = ({
  genres,
  currentSaleId,
}) => {
  const { isLoading, data = [] } = useGetSalesQuery({ genres });

  const withoutCurrentSale = data.filter(({ id }) => id !== currentSaleId);

  return (
    <Box mb={ 8 } mt={ 16 }>
      <Sales
        isLoading={ isLoading }
        sales={ withoutCurrentSale }
        title="SIMILAR SONGS"
      />
    </Box>
  );
};

export default SimilarSongs;
