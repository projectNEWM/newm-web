import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import Artists from "./Artists";
import { useGetArtistsQuery } from "../modules/artist";

const ArtistSpotlight: FunctionComponent = () => {
  const { isLoading, data: artists = [] } = useGetArtistsQuery({
    limit: 10,
    sortOrder: "desc",
  });

  const withActiveSales = artists.filter(({ marketplaceSongCount }) => {
    return marketplaceSongCount > 0;
  });

  return (
    <Stack mb={ 8 }>
      <Artists
        artists={ withActiveSales }
        isLoading={ isLoading }
        itemOrientation="column"
        numSkeletons={ 10 }
        title="ARTIST SPOTLIGHT"
        hasTitle
      />
    </Stack>
  );
};

export default ArtistSpotlight;
