import { FunctionComponent } from "react";
import ProgressBarModal from "./ProgressBarModal";

const UploadSongProgressModal: FunctionComponent = () => {
  const disclaimer =
    "Please do not refresh the page or navigate away while the " +
    "upload is in progress.";

  return <ProgressBarModal disclaimer={ disclaimer } />;
};

export default UploadSongProgressModal;
