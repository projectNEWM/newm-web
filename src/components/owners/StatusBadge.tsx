import { FunctionComponent } from "react";
import PendingBadge from "assets/images/PendingBadge";
import DeclinedBadge from "assets/images/DeclinedBadge";
import ErrorBadge from "assets/images/ErrorBadge";

export interface OwnerStatusProps {
  readonly status: string;
}

const StatusBadge: FunctionComponent<OwnerStatusProps> = ({ status = "" }) => {
  if (status === "PENDING") {
    return <PendingBadge />;
  } else if (status === "DECLINED") {
    return <DeclinedBadge />;
  } else if (status === "ERROR") {
    return <ErrorBadge />;
  } else {
    return null;
  }
};

export default StatusBadge;
