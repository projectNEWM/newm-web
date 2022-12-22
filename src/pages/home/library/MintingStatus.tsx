import { Check, Close } from "@mui/icons-material";
import InfoCircleLine from "assets/images/InfoCircleLine";
import TimeCircleLine from "assets/images/TimeCircleLine";
import { IconStatus } from "components";
import { FunctionComponent } from "react";
import theme from "theme";

interface MintingStatusProps {
  readonly mintingStatus: string | undefined;
}

export const MintingStatus: FunctionComponent<MintingStatusProps> = ({
  mintingStatus,
}) => {
  if (mintingStatus === "Earning") {
    return (
      <IconStatus
        icon={ <Check fontSize="large" sx={ { color: theme.colors.green } } /> }
        status="Distributed"
      />
    );
  } else if (mintingStatus === "Pending") {
    return (
      <IconStatus
        icon={ <TimeCircleLine /> }
        iconColor="yellow"
        status="Pending"
      />
    );
  } else if (mintingStatus === "Rejected") {
    return (
      <IconStatus icon={ <InfoCircleLine /> } iconColor="red" status="Rejected" />
    );
  } else {
    return (
      <IconStatus
        icon={ <Close fontSize="large" sx={ { color: theme.colors.grey200 } } /> }
        fontColor="grey200"
        status="Undistributed"
      />
    );
  }
};
