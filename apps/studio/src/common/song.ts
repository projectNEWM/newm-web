import { MintingStatus } from "@newm-web/types";

export const isSongEditable = (mintingStatus: MintingStatus) => {
  return (
    mintingStatus === MintingStatus.Undistributed ||
    mintingStatus === MintingStatus.Declined ||
    // Keeps user on edit flow even after payments fail after a tx error
    mintingStatus === MintingStatus.MintingPaymentRequested ||
    mintingStatus === MintingStatus.StreamTokenAgreementApproved
  );
};
