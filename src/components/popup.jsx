import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  useTheme,
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
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "0px" }} dividers>
        {children}
      </DialogContent>
      <Button
        color="secondary"
        onClick={() => {
          setOpenPopup(false);
        }}
      >
        Cancel
      </Button>
    </Dialog>
  );
}
