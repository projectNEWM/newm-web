import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale";

interface SimilarSongsProps {
  readonly currentArtistId?: string;
  readonly genres?: ReadonlyArray<string>;
}

const SimilarSongs: FunctionComponent<SimilarSongsProps> = ({
  genres,
  currentArtistId,
}) => {
  const skip = !currentArtistId;

  const { isLoading, data: sales = [] } = useGetSalesQuery(
    {
      artistIds: currentArtistId ? [`-${currentArtistId}`] : undefined,
      genres,
      limit: 8,
    },
    { skip }
  );

  return (
    <Box mb={ 8 } mt={ 16 }>
      <Sales
        isLoading={ skip || isLoading }
        sales={ sales }
        title="SIMILAR SONGS"
      />
    </Box>
  );
};

export default SimilarSongs;
