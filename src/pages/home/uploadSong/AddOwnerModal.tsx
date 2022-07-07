import { FunctionComponent } from "react";
import { Box, DialogProps, Stack, Typography, useTheme } from "@mui/material";
import { Dialog, FilledButton, HorizontalLine } from "elements";
import { SwitchField, TextInputField } from "components";

const AddOwnerModal: FunctionComponent<DialogProps> = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
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
        <Typography variant="body2">Add new</Typography>
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
          <Typography>Does this person owns ip rights to this song?</Typography>
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
            <Typography>Is this person a creator?</Typography>
            <Typography fontSize={ 12 } variant="subtitle1">
              Enable to show this person in the credits.
            </Typography>
          </Stack>
          <SwitchField name="isCreator" />
        </Stack>

        <HorizontalLine marginTop={ theme.spacing(2) } />

        <FilledButton
          type="button"
          sx={ {
            alignSelf: ["center", "center", "end"],
            maxWidth: ["340px", "340px", null],
            width: "100%",
          } }
        >
          Add
        </FilledButton>
      </Box>
    </Dialog>
  );
};

export default AddOwnerModal;
