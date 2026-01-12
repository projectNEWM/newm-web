import { FunctionComponent } from "react";
import { Theme } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { InfoCircleLine, TimeCircleLine } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { MintingStatus as MintingStatusType } from "@newm-web/types";
import { IconStatus } from "../../../components";

interface MintingStatusProps {
  readonly mintingStatus: MintingStatusType;
}

const UI_MINTING_STATUS: Record<MintingStatusType, string> = {
  ArweaveUploadException: "An error occurred",
  AwaitingAudioEncoding: "Undistributed",
  AwaitingCollaboratorApproval: "Awaiting Collaborator Approval",
  Declined: "Declined",
  Distributed: "Distribution/Minting in Process",
  DistributionException: "An error occurred",
  Minted: "Distributed & Minted",
  MintingException: "An error occurred",
  MintingPaymentException: "An error occurred",
  MintingPaymentReceived: "Undistributed",
  MintingPaymentRequested: "Undistributed",
  MintingPaymentSubmitted: "Undistributed",
  MintingPaymentTimeout: "An error occurred",
  Pending: "Distribution/Minting in Process",
  ReadyToDistribute: "Distribution/Minting in Process",
  ReleaseCheckException: "An error occurred",
  Released: "Minted and Released",
  StreamTokenAgreementApproved: "Undistributed",
  SubmittedForDistribution: "Distribution/Minting in Process",
  SubmittedForDistributionException: "An error occurred",
  Undistributed: "Undistributed",
};

// Indicates all "An error occurred" statuses. Used externally to determine tooltip content.
export const ErrorOccurredMintingStatuses = [
  MintingStatusType.ArweaveUploadException,
  MintingStatusType.DistributionException,
  MintingStatusType.MintingException,
  MintingStatusType.MintingPaymentException,
  MintingStatusType.MintingPaymentTimeout,
  MintingStatusType.ReleaseCheckException,
  MintingStatusType.SubmittedForDistributionException,
];

const STATUS_ICON_CONFIG: Record<
  string,
  {
    color?: keyof Theme["colors"];
    fontColor?: keyof Theme["colors"];
    icon: JSX.Element;
  }
> = {
  "An error occurred": {
    color: "red",
    icon: <InfoCircleLine />,
  },
  "Awaiting Collaborator Approval": {
    color: "yellow",
    icon: <TimeCircleLine />,
  },
  Declined: {
    color: "red",
    icon: <InfoCircleLine />,
  },
  "Distributed & Minted": {
    icon: <Check fontSize="medium" sx={ { color: theme.colors.green } } />,
  },
  "Distribution/Minting in Process": {
    color: "yellow",
    icon: <TimeCircleLine />,
  },
  "Minted and Released": {
    icon: <Check fontSize="medium" sx={ { color: theme.colors.green } } />,
  },
  Undistributed: {
    fontColor: "grey200",
    icon: <Close fontSize="medium" sx={ { color: theme.colors.grey200 } } />,
  },
};

export const MintingStatus: FunctionComponent<MintingStatusProps> = ({
  mintingStatus,
}) => {
  const status = UI_MINTING_STATUS[mintingStatus];
  const config = STATUS_ICON_CONFIG[status];

  if (!config) return null;

  return (
    <IconStatus
      fontColor={ config.fontColor }
      icon={ config.icon }
      iconColor={ config.color }
      status={ status }
    />
  );
};
