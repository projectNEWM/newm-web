import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import Artists from "./Artists";
import { useGetArtistsQuery } from "../modules/artist";

interface SimilarArtistsProps {
  readonly genre?: string;
}

const SimilarArtists: FunctionComponent<SimilarArtistsProps> = ({ genre }) => {
  // TODO: limit to artists with marketplace sales when API updated
  const { isLoading, data: artists = [] } = useGetArtistsQuery({
    genres: genre ? [genre] : [],
    limit: 6,
  });

  return (
    <Stack mb={ 8 }>
      <Artists
        artists={ artists }
        hasTitle={ true }
        isLoading={ isLoading }
        itemOrientation="row"
        numSkeletons={ 6 }
        title="SIMILAR ARTISTS"
      />
    </Stack>
  );
};

export default SimilarArtists;
