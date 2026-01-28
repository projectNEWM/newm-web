import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";

import { Container } from "@mui/material";

import { useFlags } from "launchdarkly-react-client-sdk";

import EditSong from "./EditSong";
import Discography from "./Discography";
import ViewDetails from "./ViewDetails";
import ReleaseDetails from "./release/ReleaseDetails";
import TrackDetails from "./release/tracks/TrackDetails";
import NotFoundPage from "../../NotFoundPage";

const Releases: FunctionComponent = () => {
  // TODO(webStudioAlbumPhaseTwo): Remove flag once flag is retired.
  const { webStudioAlbumPhaseTwo } = useFlags();

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
            <Route element={ <ReleaseDetails /> } path="new/*" />
            <Route element={ <ReleaseDetails /> } path=":releaseId/*" />

            <Route element={ <TrackDetails /> } path="new/track/new" />
            <Route element={ <TrackDetails /> } path=":releaseId/track/new" />
            <Route
              element={ <TrackDetails /> }
              path=":releaseId/track/:trackId"
            />
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
