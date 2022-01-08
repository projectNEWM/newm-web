import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={ openPopup } maxWidth="">
      <DialogTitle>
        <div sx={ {} } style={ { display: "flex" } }>
          <Typography variant="h6" component="div" style={ { flexGrow: 1 } }>
            { title }
          </Typography>
        </div>
        <IconButton
          color="primary"
          sx={ { position: "absolute", top: "0px", right: "0px" } }
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
}
