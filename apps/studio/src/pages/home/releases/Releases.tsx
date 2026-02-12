import { FunctionComponent } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useFlags } from "launchdarkly-react-client-sdk";

import { Container } from "@mui/material";

import EditSong from "./EditSong";
import Discography from "./Discography";
import ViewDetails from "./ViewDetails";
import ReleaseDetails from "./release/ReleaseDetails";
import TrackDetailsRouter from "./release/tracks/TrackDetailsRouter";
import Distribute from "./release/distribute/Distribute";
import NewTrack from "./release/tracks/NewTrack";
import NotFoundPage from "../../NotFoundPage";

const Releases: FunctionComponent = () => {
  // TODO(webStudioAlbumPhaseTwo): Remove flag once flag is retired.
  // TODO(webStudioDisableDistributionAndSales): Remove once flag is retired.
  const { webStudioAlbumPhaseTwo, webStudioDisableDistributionAndSales } =
    useFlags();

  return (
    <Container
      maxWidth={ false }
      sx={ {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        flexWrap: "nowrap",
        marginTop: 10.5,
        mx: [null, null, 3],
        pb: 8,
        width: "auto",
      } }
    >
      <Routes>
        <Route element={ <Discography /> } path="/" />

        <Route element={ <EditSong /> } path="edit-song/:songId*" />
        <Route element={ <ViewDetails /> } path="view-details/:songId" />

        { webStudioAlbumPhaseTwo && (
          <>
            <Route
              element={
                webStudioDisableDistributionAndSales ? (
                  <Navigate to="/home/releases" replace />
                ) : (
                  <ReleaseDetails />
                )
              }
              path="new/*"
            />
            <Route element={ <ReleaseDetails /> } path=":releaseId/*" />

            <Route
              element={
                webStudioDisableDistributionAndSales ? (
                  <Navigate to="/home/releases" replace />
                ) : (
                  <NewTrack />
                )
              }
              path="new/track/new"
            />

            <Route
              element={
                webStudioDisableDistributionAndSales ? (
                  <Navigate to="/home/releases" replace />
                ) : (
                  <NewTrack />
                )
              }
              path=":releaseId/track/new"
            />

            <Route
              element={ <TrackDetailsRouter /> }
              path=":releaseId/track/:trackId"
            />

            <Route element={ <Distribute /> } path=":releaseId/distribute" />
          </>
        ) }

        <Route
          element={ <NotFoundPage redirectUrl="/home/releases" /> }
          path="*"
        />
      </Routes>
    </Container>
  );
};

export default Releases;
