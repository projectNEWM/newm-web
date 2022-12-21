import { Box } from "@mui/material";
import CheckCircleLine from "assets/images/CheckCircleLine";
import CloseCircleLine from "assets/images/CloseCircleLine";
import InfoCircleLine from "assets/images/InfoCircleLine";
import TimeCircleLine from "assets/images/TimeCircleLine";
import { IconStatus } from "components";
import { FunctionComponent } from "react";

interface MintingStatusProps {
  readonly mintingStatus: string | undefined;
}

export const MintingStatus: FunctionComponent<MintingStatusProps> = ({
  mintingStatus,
}) => {
  if (mintingStatus === "Earning") {
    return (
      <Box sx={ { display: "flex", alignItems: "center" } }>
        <IconStatus
          icon={ <CheckCircleLine /> }
          iconColor="green"
          status="Distributed"
        />
      </Box>
    );
  } else if (mintingStatus === "Pending") {
    return (
      <Box sx={ { display: "flex", alignItems: "center" } }>
        <IconStatus
          icon={ <TimeCircleLine /> }
          iconColor="yellow"
          status="Pending"
        />
      </Box>
    );
  } else if (mintingStatus === "Rejected") {
    return (
      <Box sx={ { display: "flex", alignItems: "center" } }>
        <IconStatus
          icon={ <InfoCircleLine /> }
          iconColor="red"
          status="Rejected"
        />
      </Box>
    );
  } else {
    return (
      <Box sx={ { display: "flex", alignItems: "center" } }>
        <IconStatus
          icon={ <CloseCircleLine /> }
          iconColor="grey200"
          fontColor="grey200"
          status="Undistributed"
        />
      </Box>
    );
  }
};
