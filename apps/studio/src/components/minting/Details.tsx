import { FunctionComponent } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import { Badge, BadgeProps } from "@newm-web/elements";
import { CollaborationStatus } from "../../modules/song";

interface DetailsProps {
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly pictureUrl?: string;
  readonly showStatus?: boolean;
  readonly status?: CollaborationStatus;
}

const badgeMap: Record<Exclude<CollaborationStatus, "Editing">, BadgeProps> = {
  Accepted: { bgColor: "green", children: "Accepted", textColor: "black" },
  Rejected: { bgColor: "red", children: "Rejected", textColor: "black" },
  Waiting: { bgColor: "yellow", children: "Pending", textColor: "black" },
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
    <Stack
      alignItems={ ["start", "center"] }
      columnGap={ [1, 1, 2] }
      direction={ ["column", "row"] }
      rowGap={ 1 }
    >
      { pictureUrl ? (
        <img
          alt="Profile"
          src={ pictureUrl }
          style={ {
            borderRadius: "50%",
            height: "40px",
            width: "40px",
          } }
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

        <Typography title={ email } variant="subtitle1">
          { email }
        </Typography>
      </Stack>
      { showStatus && status && status !== "Editing" ? (
        <Badge { ...badgeMap[status] } />
      ) : null }
    </Stack>
  );
};

export default Details;
