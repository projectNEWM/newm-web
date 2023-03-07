import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { Modal } from "components";
import {
  getIdenfyAuthToken,
  removeVerificationTimer,
  selectSession,
  extendedApi as sessionApi,
  startVerificationTimer,
} from "modules/session";

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

  const { verificationPingStartedAt, profile: { verificationStatus } = {} } =
    useSelector(selectSession);

  if (!idenfyAuthToken) {
    dispatch(getIdenfyAuthToken());
  }

  /** Triggers onClose when user is verified and removes verification timer. */
  if (verificationStatus === "Verified") {
    const event = new Event("close");

    dispatch(removeVerificationTimer());

    onClose(event);
  }

  /**
   * Listens for success message event.
   * Triggers the verification timer to start when event is received.
   */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event?.data === "idenfy-verification-success") {
        if (!verificationPingStartedAt) {
          dispatch(startVerificationTimer());
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [dispatch, verificationPingStartedAt]);

  /**
   * Requests profile information at 1 second interval.
   * Clears interval when it has been more than 20 minutes or user is verified.
   */
  useEffect(() => {
    const TWENTY_MINUTES = 20 * 60 * 1000;
    const hasExceededAllowedTime =
      verificationPingStartedAt && verificationPingStartedAt > TWENTY_MINUTES;
    const verificationStatusInterval = setInterval(() => {
      dispatch(sessionApi.endpoints.getProfile.initiate());
    }, 1000);

    if (hasExceededAllowedTime || verificationStatus === "Verified") {
      clearInterval(verificationStatusInterval);
    }

    return () => clearInterval(verificationStatusInterval);
  }, [dispatch, verificationPingStartedAt, verificationStatus]);

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
          alignItems="center"
          height="100%"
          justifyContent="center"
          width="100%"
        >
          <CircularProgress />
        </Stack>
      ) }
    </Modal>
  );
};

export default IdenfyModal;
