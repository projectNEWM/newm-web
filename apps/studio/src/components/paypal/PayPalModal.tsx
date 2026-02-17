import { FunctionComponent, useEffect } from "react";
import { Box, Link, Typography } from "@mui/material";
import { Modal } from "@newm-web/elements";
import {
  closePayPalPopup,
  getPayPalPopup,
  useAppDispatch,
  useAppSelector,
} from "../../common";
import { selectUi } from "../../modules/ui";
import { setIsPayPalModalOpen } from "../../modules/ui";

const PayPalModal: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isPayPalModalOpen: isOpen } = useAppSelector(selectUi);

  const handleClose = () => {
    if (isOpen) dispatch(setIsPayPalModalOpen(false));
    closePayPalPopup();
  };

  const handleFocusPopup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const paypalPopUp = getPayPalPopup();
    if (paypalPopUp && !paypalPopUp.closed) {
      try {
        paypalPopUp.focus();
      } catch {
        // Intentionally ignore: focus can fail on some browsers or if window state changed.
      }
      return;
    }
  };

  return (
    <Modal
      isOpen={ isOpen }
      style={ { height: "100%", width: "100%" } }
      title="PayPal Payment"
      onClose={ handleClose }
    >
      <Box
        sx={ {
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          p: 2.5,
          textAlign: "center",
        } }
      >
        <Typography variant="body1">
          Please complete your PayPal payment in the pop-up window.
        </Typography>
        <Link href="#" underline="hover" onClick={ handleFocusPopup }>
          Return to PayPal window
        </Link>
      </Box>
    </Modal>
  );
};

export default PayPalModal;
