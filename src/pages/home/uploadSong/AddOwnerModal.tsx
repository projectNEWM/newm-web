import { FunctionComponent } from "react";
import { Box, DialogProps, Stack, Typography, useTheme } from "@mui/material";
import { Button, Dialog, HorizontalLine, OutlinedButton } from "elements";
import { SwitchField, TextInputField } from "components";

interface AddOwnerModalProps extends Omit<DialogProps, "onClose"> {
  readonly onClose: VoidFunction;
}

const AddOwnerModal: FunctionComponent<AddOwnerModalProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      aria-labelledby="modal-title"
      fullWidth
      onClose={ onClose }
      open={ open }
      sx={ {
        "& .MuiPaper-root": {
          backgroundColor: theme.colors.grey600,
        },
      } }
    >
      <Box
        sx={ {
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(3),
          rowGap: 2,
        } }
      >
        <Typography variant="body2" id="modal-title">
          Add new
        </Typography>
        <TextInputField label="Name" name="Name" placeholder="John Smith" />
        <TextInputField
          label="Email"
          name="Email"
          placeholder="john.smith@gmail.com"
        />

        <HorizontalLine marginTop={ theme.spacing(2) } />

        <Stack
          sx={ {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: theme.spacing(2),
          } }
        >
          <Typography paddingRight={ theme.spacing(1) }>
            Does this person owns ip rights to this song?
          </Typography>
          <SwitchField name="isRightsOwner" />
        </Stack>

        <Stack
          sx={ {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: theme.spacing(2),
          } }
        >
          <Stack>
            <Typography paddingRight={ theme.spacing(1) }>
              Is this person a creator?
            </Typography>
            <Typography
              fontSize={ 12 }
              paddingRight={ theme.spacing(1) }
              variant="subtitle1"
            >
              Enable to show this person in the credits.
            </Typography>
          </Stack>
          <SwitchField name="isCreator" />
        </Stack>

        <HorizontalLine marginTop={ theme.spacing(2) } />

        <Stack
          sx={ {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            columnGap: 4,
          } }
        >
          <OutlinedButton onClick={ onClose }>Cancel</OutlinedButton>
          <Button width="compact">Add</Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default AddOwnerModal;
