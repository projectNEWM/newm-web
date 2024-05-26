import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import Artists from "./Artists";
import { useGetArtistsQuery } from "../modules/artist";

const ArtistSpotlight: FunctionComponent = () => {
  // TODO: Confirm only artist with active sales are returned after API updated
  const { isLoading, data: artists = [] } = useGetArtistsQuery({
    limit: 10,
    sortOrder: "desc",
  });

  return (
    <Stack mb={ 8 }>
      <Artists
        artists={ artists }
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
