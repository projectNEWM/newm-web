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
  const { isLoading, data: sales = [] } = useGetSalesQuery({ genres });

  // TODO: filter out these sales using query param when back-end updated
  const withoutCurrentArtist = sales.filter(({ song: { artistId } }) => {
    return artistId !== currentArtistId;
  });

  return (
    <Box mb={ 8 } mt={ 16 }>
      <Sales
        isLoading={ isLoading }
        sales={ withoutCurrentArtist }
        title="SIMILAR SONGS"
      />
    </Box>
  );
};

export default SimilarSongs;
