import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import { Button } from "@newm-web/elements";

interface DeleteSongModalProps {
  primaryAction: () => void;
  secondaryAction: () => void;
}

const DeleteSongModal: FunctionComponent<DeleteSongModalProps> = ({
  primaryAction,
  secondaryAction,
}) => (
  <Stack
    sx={ {
      alignItems: "center",
      backgroundColor: theme.colors.backdropBlur,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      left: 0,
      position: "fixed",
      right: 0,
      top: 0,
      zIndex: 9999,
    } }
  >
    <Stack p={ 2 }>
      <Stack
        sx={ {
          backgroundColor: theme.colors.black,
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          maxWidth: "670px",
          padding: "24px 24px 10px",
          rowGap: 1,
        } }
      >
        <Typography fontWeight="fontWeightBold" variant="body2">
          DELETE RELEASE
        </Typography>
        <Typography
          sx={ {
            borderBottom: `2px solid ${theme.colors.grey600}`,
            paddingBottom: 2.5,
          } }
          variant="subtitle1"
        >
          Are you sure you want to delete this release? All progress and
          existing metadata will be lost.
        </Typography>
      </Stack>
      <Stack
        sx={ {
          backgroundColor: theme.colors.black,
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          columnGap: 1.5,
          flexDirection: "row",
          justifyContent: "end",
          padding: "10px 24px 24px",
        } }
      >
        <Button
          color="music"
          variant="secondary"
          width="compact"
          onClick={ secondaryAction }
        >
          Cancel
        </Button>
        <Button width="compact" onClick={ primaryAction }>
          Delete
        </Button>
      </Stack>
    </Stack>
  </Stack>
);

export default DeleteSongModal;
