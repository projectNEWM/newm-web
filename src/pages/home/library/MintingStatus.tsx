import { Check, Close } from "@mui/icons-material";
import InfoCircleLine from "assets/images/InfoCircleLine";
import TimeCircleLine from "assets/images/TimeCircleLine";
import { MintingStatus as MintingStatusType } from "modules/song";
import { IconStatus } from "components";
import { FunctionComponent } from "react";
import theme from "theme";

interface MintingStatusProps {
  readonly mintingStatus: MintingStatusType;
}

export const MintingStatus: FunctionComponent<MintingStatusProps> = ({
  mintingStatus,
}) => {
  const isPending = [
    MintingStatusType.StreamTokenAgreementApproved,
    MintingStatusType.MintingPaymentReceived,
    MintingStatusType.ReadyToDistribute,
    MintingStatusType.SubmittedForDistribution,
    MintingStatusType.Distributed,
    MintingStatusType.Pending,
  ].includes(mintingStatus);

  if (mintingStatus === MintingStatusType.Distributed) {
    return (
      <IconStatus
        icon={ <Check fontSize="medium" sx={ { color: theme.colors.green } } /> }
        status="Distributed"
      />
    );
  } else if (isPending) {
    return (
      <IconStatus
        icon={ <TimeCircleLine /> }
        iconColor="yellow"
        status="Pending"
      />
    );
  } else if (mintingStatus === MintingStatusType.AwaitingCollaboratorApproval) {
    return (
      <IconStatus
        icon={ <TimeCircleLine /> }
        iconColor="yellow"
        status="Pending collaborator approval"
      />
    );
  } else if (mintingStatus === MintingStatusType.Declined) {
    return (
      <IconStatus icon={ <InfoCircleLine /> } iconColor="red" status="Declined" />
    );
  } else if (mintingStatus === MintingStatusType.MintingPaymentRequested) {
    return (
      <IconStatus
        icon={ <TimeCircleLine /> }
        iconColor="yellow"
        status="Minting payment requested"
      />
    );
  } else if (mintingStatus === MintingStatusType.Undistributed) {
    return (
      <IconStatus
        icon={ <Close fontSize="medium" sx={ { color: theme.colors.grey200 } } /> }
        fontColor="grey200"
        status="Undistributed"
      />
    );
  } else {
    return null;
  }
};
