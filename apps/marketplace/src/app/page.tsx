"use client";
import { FunctionComponent } from "react";
import { Container } from "@mui/material";
import { useFlags } from "launchdarkly-react-client-sdk";
import { ArtistSpotlight, LaunchBanner, RecentSongs } from "../components";

const Home: FunctionComponent = () => {
  const { webMarketplaceLaunchBanner } = useFlags();
  return (
    <Container sx={ { flexGrow: 1 } }>
      { webMarketplaceLaunchBanner && <LaunchBanner /> }
      <RecentSongs />

      <ArtistSpotlight />
    </Container>
  );
};

export default Home;
