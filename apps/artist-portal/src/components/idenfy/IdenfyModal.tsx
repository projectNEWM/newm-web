import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { CircularProgress, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { Modal } from "@newm.io/studio/components";
import { getIdenfyAuthToken } from "@newm.io/studio/modules/session";
import theme from "@newm.io/studio/theme";
import { selectUi, setIsIdenfyModalOpen } from "@newm.io/studio/modules/ui";
import { useAppDispatch, useAppSelector } from "@newm.io/studio/common";

const IdenfyModal: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { isIdenfyModalOpen: isOpen } = useAppSelector(selectUi);

  const [idenfyAuthToken, setIdenfyAuthToken] = useState(Cookies.get("idenfyAuthToken"));

  const handleClose = useCallback(() => {
    if (isOpen) dispatch(setIsIdenfyModalOpen(false));
  }, [dispatch, isOpen]);

  /** Listens for modal close message. */
  useEffect(() => {
    if (!isOpen) return;

    const handleMessage = (event: MessageEvent) => {
      if (event?.data === "idenfy-modal-close") {
        handleClose();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isOpen, handleClose]);

  /**
   * Gets "idenfyAuthToken" cookie at 1 second interval.
   * Clears the interval when a value is found.
   */
  useEffect(() => {
    if (!isOpen) return;

    const cookieRefreshInterval = setInterval(() => {
      const newAuthToken = Cookies.get("idenfyAuthToken");

      if (newAuthToken !== idenfyAuthToken) {
        setIdenfyAuthToken(newAuthToken);
      }
    }, 1000);

    if (!idenfyAuthToken) {
      dispatch(getIdenfyAuthToken());
    } else {
      clearInterval(cookieRefreshInterval);
    }

    return () => clearInterval(cookieRefreshInterval);
  }, [isOpen, idenfyAuthToken, dispatch]);

  return (
    <Modal isOpen={ isOpen } onClose={ handleClose }>
      { idenfyAuthToken ? (
        <iframe
          allow="camera"
          allowFullScreen={ true }
          style={ {
            border: "none",
            height: "100%",
            padding: "24px",
            width: "100%",
          } }
          src={ `https://ui.idenfy.com/?authToken=${idenfyAuthToken}` }
          title="iDenfy verification session"
        />
      ) : (
        <Stack
          sx={ {
            alignItems: "center",
            backgroundColor: theme.colors.black,
            height: "100%",
            justifyContent: "center",
            width: "100%",
          } }
        >
          <CircularProgress />
        </Stack>
      ) }
    </Modal>
  );
};

export default IdenfyModal;
