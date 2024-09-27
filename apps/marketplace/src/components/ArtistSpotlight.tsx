import { FunctionComponent, useState } from "react";
import { Stack } from "@mui/material";
import Artists from "./Artists";
import { useGetArtistsCountQuery, useGetArtistsQuery } from "../modules/artist";

const ArtistSpotlight: FunctionComponent = () => {
  const requestSize = 10;
  const [numArtists, setNumArtists] = useState(requestSize);

  const { isFetching, data: artistData = [] } = useGetArtistsQuery({
    limit: numArtists,
    sortOrder: "desc",
  });

  const { data: artistCountData } = useGetArtistsCountQuery();

  const hasMore =
    !!artistCountData?.count && artistCountData?.count > numArtists;

  const numSkeletons = artistCountData?.count
    ? Math.min(artistCountData.count - artistData.length, requestSize)
    : requestSize;

  /**
   * Increment the artists query limit to fetch
   * additional artists.
   */
  const handleLoadMore = () => {
    setNumArtists((current) => current + requestSize);
  };

  return (
    <Stack mb={ 8 }>
      <Artists
        artists={ artistData }
        hasMore={ hasMore }
        isLoading={ isFetching }
        itemOrientation="column"
        numSkeletons={ numSkeletons }
        title="ARTIST SPOTLIGHT"
        onLoadMore={ handleLoadMore }
      />
    </Stack>
  );
};

export default ArtistSpotlight;
