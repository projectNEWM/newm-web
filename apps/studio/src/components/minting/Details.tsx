import { FunctionComponent } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import { Pill, PillProps } from "@newm-web/elements";
import { CollaborationStatus } from "../../modules/song";

interface DetailsProps {
  readonly email: string;
  readonly nickname?: string;
  readonly pictureUrl?: string;
  readonly showStatus?: boolean;
  readonly status?: CollaborationStatus;
}

const pillMap: Record<Exclude<CollaborationStatus, "Editing">, PillProps> = {
  Accepted: { bgColor: "green", children: "Accepted", textColor: "black" },
  Rejected: { bgColor: "red", children: "Rejected", textColor: "black" },
  Waiting: { bgColor: "yellow", children: "Pending", textColor: "black" },
};

const Details: FunctionComponent<DetailsProps> = ({
  pictureUrl,
  email,
  status,
  showStatus = true,
  nickname = "",
}) => {
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
        <Typography title={ nickname }>{ nickname }</Typography>

        <Typography title={ email } variant="subtitle1">
          { email }
        </Typography>
      </Stack>
      { showStatus && status && status !== "Editing" ? (
        <Pill { ...pillMap[status] } />
      ) : null }
    </Stack>
  );
};

export default Details;
