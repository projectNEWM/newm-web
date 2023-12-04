import { setProgressBarModal } from "./slice";
import { UploadProgressParams } from "./types";

/**
 * Uses a progress decimal value (from 0 to 1) to update the
 * progress modal bar position.
 */
export const handleUploadProgress = ({
  progress = 0,
  baseProgress,
  totalIncrement,
  message,
  disclaimer,
  dispatch,
}: UploadProgressParams) => {
  const currentTotalProgress = baseProgress + totalIncrement * progress;

  dispatch(
    setProgressBarModal({
      progress: currentTotalProgress,
      message,
      disclaimer,
      animationSeconds: 1,
    })
  );
};
