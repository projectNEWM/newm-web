import { FunctionComponent } from "react";
import { DialogActions, DialogContentText, DialogProps } from "@mui/material";
import { Button, Dialog, HorizontalLine, Typography } from "elements";
import theme from "theme";

interface OwnerModalProps extends Omit<DialogProps, "onClose"> {
  readonly onClose: VoidFunction;
  readonly biography?: string;
  readonly nickname?: string;
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
      onClose={ onClose }
      sx={ {
        ".MuiDialog-paper": {
          padding: 3,
          rowGap: 2.5,
        },
      } }
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
            <Typography variant="subtitle1" color="white" mt={ 0.5 }>
              { role }
            </Typography>
          </>
        ) : null }

        { biography ? (
          <>
            <Typography variant="body1" mt={ 2.5 }>
              DESCRIPTION
            </Typography>
            <Typography variant="subtitle1" color="white" mt={ 0.5 }>
              { biography }
            </Typography>
          </>
        ) : null }
      </DialogContentText>

      <HorizontalLine />

      <DialogActions>
        <Button color="music" onClick={ onClose } width="compact">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;

export default OwnerModal;
