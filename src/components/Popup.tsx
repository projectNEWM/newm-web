import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";

interface PopupProps {
  title: string;
  children: React.ReactNode;
  openPopup: boolean;
  setOpenPopup: (open: boolean) => void;
  width?: string;
  height: string;
}

export const Popup = (props: PopupProps) => {
  const { title, children, openPopup, setOpenPopup, width, height } = props;

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
      <DialogContent
        sx={ { height: height, paddingTop: "0px", paddingLeft: "0px", paddingRight: "0px", width: width } }
        dividers
      >
        { children }
      </DialogContent>
    </Dialog>
  );
};
