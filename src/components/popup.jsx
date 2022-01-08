import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup} maxWidth="">
      <DialogTitle>
        <div sx={{}} style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </div>
        <IconButton
          color="primary"
          sx={{ position: "absolute", top: "0px", right: "0px" }}
          onClick={() => {
            setOpenPopup(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "0px" }} dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}
