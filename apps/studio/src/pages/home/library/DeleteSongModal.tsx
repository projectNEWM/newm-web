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
      backgroundColor: "black",
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
          backgroundColor: theme.colors.grey500,
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          maxWidth: "512px",
          padding: "24px 24px 16px",
          rowGap: 1,
        } }
      >
        <Typography variant="body2">Delete Song</Typography>
        <Typography variant="subtitle1">
          Are you sure you want to delete this song? Clicking &quot;Yes,&quot;
          will immediately remove this song from your library.
        </Typography>
      </Stack>
      <Stack
        sx={ {
          backgroundColor: theme.colors.grey600,
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          columnGap: 1.5,
          flexDirection: "row",
          justifyContent: "end",
          padding: "12px 24px",
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
          Yes
        </Button>
      </Stack>
    </Stack>
  </Stack>
);

export default DeleteSongModal;
