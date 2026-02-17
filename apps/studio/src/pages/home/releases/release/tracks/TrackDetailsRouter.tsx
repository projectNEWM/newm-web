import type { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditTrack from "./EditTrack";
import ViewTrack from "./ViewTrack";
import { isSongEditable } from "../../../../../common";
import { useGetSongQuery, useHasSongAccess } from "../../../../../modules/song";

const TrackDetailsRouter: FunctionComponent = () => {
  const navigate = useNavigate();
  const { trackId } = useParams<"trackId">();

  const {
    data: { mintingStatus } = {},
    isLoading,
    error,
  } = useGetSongQuery(trackId as string, { skip: !trackId });
  const hasAccess = useHasSongAccess(trackId ?? "");

  if (!trackId || isLoading) return null;

  if (error || !hasAccess) {
    navigate("/home/releases");
    return null;
  }

  if (mintingStatus && isSongEditable(mintingStatus)) {
    return <EditTrack />;
  }

  return <ViewTrack />;
};

export default TrackDetailsRouter;
