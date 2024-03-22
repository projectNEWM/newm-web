import { MintingStatus } from "@newm-web/types";

export const isSongEditable = (mintingStatus: MintingStatus) => {
  return (
    mintingStatus === MintingStatus.Undistributed ||
    mintingStatus === MintingStatus.Declined
  );
};
