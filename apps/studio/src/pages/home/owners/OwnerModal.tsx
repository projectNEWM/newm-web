import { FunctionComponent } from "react";
import { DialogActions, DialogContentText, DialogProps } from "@mui/material";
import { Button, Dialog, HorizontalLine, Typography } from "@newm-web/elements";

interface OwnerModalProps extends Omit<DialogProps, "onClose"> {
  readonly biography?: string;
  readonly nickname?: string;
  readonly onClose: VoidFunction;
  readonly role?: string;
}

const OwnerModal: FunctionComponent<OwnerModalProps> = ({
  biography,
  nickname,
  onClose,
  open,
  role,
}) =>
  open ? (
    <Dialog
      fullWidth={ true }
      maxWidth={ "sm" }
      open={ open }
      sx={ {
        ".MuiDialog-paper": {
          padding: 3,
          rowGap: 2.5,
        },
      } }
      onClose={ onClose }
    >
      <Typography
        fontSize="20px"
        fontWeight={ 800 }
        lineHeight="24px"
        textTransform="uppercase"
        variant="h4"
      >
        About { nickname }
      </Typography>
      <DialogContentText>
        { role ? (
          <>
            <Typography variant="body1">MAIN ROLES</Typography>
            <Typography color="white" mt={ 0.5 } variant="subtitle1">
              { role }
            </Typography>
          </>
        ) : null }

        { biography ? (
          <>
            <Typography mt={ 2.5 } variant="body1">
              DESCRIPTION
            </Typography>
            <Typography color="white" mt={ 0.5 } variant="subtitle1">
              { biography }
            </Typography>
          </>
        ) : null }
      </DialogContentText>

      <HorizontalLine />

      <DialogActions>
        <Button color="music" width="compact" onClick={ onClose }>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;

export default OwnerModal;
