import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";

interface PopupProps {
  title: string;
  children: React.ReactNode;
  openPopup: boolean;
  setOpenPopup: (open: boolean) => void;
}

export const Popup = (props: PopupProps) => {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={ openPopup } maxWidth={ false }>
      <DialogTitle>
        <div style={ { display: "flex" } }>
          <Typography variant="h6" component="div" style={ { flexGrow: 1 } }>
            { title }
          </Typography>
        </div>
        <IconButton
          color="primary"
          sx={ { position: "absolute", right: "0px", top: "0px" } }
          onClick={ () => {
            setOpenPopup(false);
          } }
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={ { paddingTop: "0px" } } dividers>
        { children }
      </DialogContent>
      <Button
        color="secondary"
        onClick={ () => {
          setOpenPopup(false);
        } }
      >
        Cancel
      </Button>
    </Dialog>
  );
};
