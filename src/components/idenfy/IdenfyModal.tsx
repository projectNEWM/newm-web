import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { Modal } from "components";
import { getIdenfyAuthToken } from "modules/session";
import theme from "theme";

interface IdenfyModalProps {
  readonly isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly onClose: (event: React.SyntheticEvent<any> | Event) => void;
}

const IdenfyModal: FunctionComponent<IdenfyModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [idenfyAuthToken, setIdenfyAuthToken] = useState(
    Cookies.get("idenfyAuthToken")
  );

  if (!idenfyAuthToken) {
    dispatch(getIdenfyAuthToken());
  }

  /** Listens for modal close message. */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event?.data === "idenfy-modal-close") {
        const event = new Event("close");

        onClose(event);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onClose]);

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
    <Modal isOpen={ isOpen } onClose={ onClose }>
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
