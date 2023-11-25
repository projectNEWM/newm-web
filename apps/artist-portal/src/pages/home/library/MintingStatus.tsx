import { FunctionComponent } from "react";
import { Theme } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { MintingStatus as MintingStatusType } from "@newm.io/studio/modules/song";
import { IconStatus } from "@newm.io/studio/components";
import InfoCircleLine from "@newm.io/studio/assets/images/InfoCircleLine";
import TimeCircleLine from "@newm.io/studio/assets/images/TimeCircleLine";
import theme from "@newm.io/studio/theme";

interface MintingStatusProps {
  readonly mintingStatus: MintingStatusType;
}

const UI_MINTING_STATUS: Record<MintingStatusType, string> = {
  Undistributed: "Undistributed",
  StreamTokenAgreementApproved: "Undistributed",
  MintingPaymentRequested: "Undistributed",
  MintingPaymentSubmitted: "Undistributed",
  MintingPaymentReceived: "Undistributed",
  AwaitingAudioEncoding: "Undistributed",
  AwaitingCollaboratorApproval: "Awaiting Collaborator Approval",
  ReadyToDistribute: "Distribution/Minting in Process",
  SubmittedForDistribution: "Distribution/Minting in Process",
  Distributed: "Distribution/Minting in Process",
  Pending: "Distribution/Minting in Process",
  Declined: "Declined",
  Minted: "Distributed & Minted",
  MintingPaymentTimeout: "An error occurred",
  MintingPaymentException: "An error occurred",
  DistributionException: "An error occurred",
  SubmittedForDistributionException: "An error occurred",
  ArweaveUploadException: "An error occurred",
  MintingException: "An error occurred",
};

const STATUS_ICON_CONFIG: Record<
  string,
  {
    icon: JSX.Element;
    color?: keyof Theme["colors"];
    fontColor?: keyof Theme["colors"];
  }
> = {
  Undistributed: {
    icon: <Close fontSize="medium" sx={ { color: theme.colors.grey200 } } />,
    fontColor: "grey200",
  },
  "Awaiting Collaborator Approval": {
    icon: <TimeCircleLine />,
    color: "yellow",
  },
  "Distribution/Minting in Process": {
    icon: <TimeCircleLine />,
    color: "yellow",
  },
  Declined: {
    icon: <InfoCircleLine />,
    color: "red",
  },
  "Distributed & Minted": {
    icon: <Check fontSize="medium" sx={ { color: theme.colors.green } } />,
  },
  "An error occurred": {
    icon: <InfoCircleLine />,
    color: "red",
  },
};

export const MintingStatus: FunctionComponent<MintingStatusProps> = ({ mintingStatus }) => {
  const status = UI_MINTING_STATUS[mintingStatus];
  const config = STATUS_ICON_CONFIG[status];

  if (!config) return null;

  return <IconStatus icon={ config.icon } iconColor={ config.color } fontColor={ config.fontColor } status={ status } />;
};
