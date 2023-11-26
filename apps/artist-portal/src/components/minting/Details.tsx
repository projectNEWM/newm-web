import { FunctionComponent } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CollaborationStatus } from "@newm.io/studio/modules/song";
import { Stack, Typography } from "@mui/material";
import theme from "@newm.io/theme";
import { Badge, BadgeProps } from "@newm.io/studio/components";

interface DetailsProps {
  readonly email: string;
  readonly pictureUrl?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly status?: CollaborationStatus;
  readonly showStatus?: boolean;
}

const badgeMap: Record<Exclude<CollaborationStatus, "Editing">, BadgeProps> = {
  Waiting: { textColor: "black", bgColor: "yellow", children: "Pending" },
  Rejected: { textColor: "black", bgColor: "red", children: "Rejected" },
  Accepted: { textColor: "black", bgColor: "green", children: "Accepted" },
};

const Details: FunctionComponent<DetailsProps> = ({
  pictureUrl,
  firstName,
  lastName,
  email,
  status,
  showStatus = true,
}) => {
  const name = `${firstName || ""} ${lastName || ""}`.trim();

  return (
    <Stack direction={ ["column", "row"] } alignItems={ ["start", "center"] } columnGap={ [1, 1, 2] } rowGap={ 1 }>
      { pictureUrl ? (
        <img
          style={ {
            borderRadius: "50%",
            width: "40px",
            height: "40px",
          } }
          src={ pictureUrl }
          alt="Profile"
        />
      ) : (
        <AccountCircleIcon
          sx={ {
            color: theme.colors.grey200,
            fontSize: "46px",
            marginLeft: "-2px",
          } }
        />
      ) }
      <Stack maxWidth={ ["150px", "300px"] } sx={ { overflowX: "auto" } }>
        { name ? <Typography title={ name }>{ name }</Typography> : null }

        <Typography variant="subtitle1" title={ email }>
          { email }
        </Typography>
      </Stack>
      { showStatus && status && status !== "Editing" ? <Badge { ...badgeMap[status] } /> : null }
    </Stack>
  );
};

export default Details;
