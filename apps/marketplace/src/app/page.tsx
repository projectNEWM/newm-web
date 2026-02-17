"use client";
import { FunctionComponent } from "react";
import { Container, Stack } from "@mui/material";
import { useFlags } from "launchdarkly-react-client-sdk";
import { ArtistSpotlight, LaunchBanner, RecentSongs } from "../components";

const Home: FunctionComponent = () => {
  const { webMarketplaceLaunchBanner } = useFlags();
  return (
    <Stack flexGrow={ 1 }>
      { webMarketplaceLaunchBanner && <LaunchBanner /> }

      <Container sx={ { flexGrow: 1 } }>
        <RecentSongs />
        <ArtistSpotlight />
      </Container>
    </Stack>
  );
};

export default Home;
