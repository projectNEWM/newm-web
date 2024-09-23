import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import Artists from "./Artists";
import { useGetArtistsQuery } from "../modules/artist";

interface SimilarArtistsProps {
  readonly artistId?: string;
  readonly genre?: string;
}

const SimilarArtists: FunctionComponent<SimilarArtistsProps> = ({
  artistId,
  genre,
}) => {
  const limit = 6;
  const skip = !artistId;

  const { isLoading, data: artists = [] } = useGetArtistsQuery(
    {
      genres: genre ? [genre] : [],
      ids: [`-${artistId}`],
      limit,
    },
    { skip }
  );

  return (
    <Stack mb={ 8 }>
      <Artists
        artists={ artists }
        hasTitle={ true }
        isLoading={ skip || isLoading }
        itemOrientation="row"
        numSkeletons={ limit }
        title="SIMILAR ARTISTS"
      />
    </Stack>
  );
};

export default SimilarArtists;
