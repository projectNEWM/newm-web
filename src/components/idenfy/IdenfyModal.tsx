import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { Modal } from "components";
import { getIdenfyAuthToken } from "modules/session";
import theme from "theme";
import { selectUi, setIsIdenfyModalOpen } from "modules/ui";

const IdenfyModal: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { isIdenfyModalOpen: isOpen } = useSelector(selectUi);

  const [idenfyAuthToken, setIdenfyAuthToken] = useState(
    Cookies.get("idenfyAuthToken")
  );

  if (!idenfyAuthToken) {
    dispatch(getIdenfyAuthToken());
  }

  const handleClose = useCallback(() => {
    dispatch(setIsIdenfyModalOpen(false));
  }, [dispatch]);

  /** Listens for modal close message. */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event?.data === "idenfy-modal-close") {
        handleClose();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleClose]);

  /**
   * Gets "idenfyAuthToken" cookie at 1 second interval.
   * Clears the interval when a value is found.
   */
  useEffect(() => {
    const cookieRefreshInterval = setInterval(() => {
      const newAuthToken = Cookies.get("idenfyAuthToken");

      if (newAuthToken !== idenfyAuthToken) {
        setIdenfyAuthToken(newAuthToken);
      }
    }, 1000);

    if (idenfyAuthToken) {
      clearInterval(cookieRefreshInterval);
    }

    return () => clearInterval(cookieRefreshInterval);
  }, [idenfyAuthToken]);

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
        ></iframe>
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
