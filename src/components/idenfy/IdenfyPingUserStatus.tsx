import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "modules/ui";
import Cookies from "js-cookie";
import {
  VerificationStatus,
  emptyProfile,
  removeVerificationTimer,
  selectSession,
  extendedApi as sessionApi,
  startVerificationTimer,
  useGetProfileQuery,
} from "modules/session";

const IdenfyModal: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectSession);

  const { data: { verificationStatus } = emptyProfile } = useGetProfileQuery(
    undefined,
    { skip: !isLoggedIn }
  );

  const { verificationPingStartedAt } = useSelector(selectSession);

  const isVerified = verificationStatus === VerificationStatus.Verified;

  /**
   * Removes verification timer and token when verified.
   * Sends a success toast message.
   */
  if (isVerified && verificationPingStartedAt) {
    Cookies.remove("idenfyAuthToken");

    dispatch(removeVerificationTimer());

    dispatch(
      setToastMessage({
        heading: "Congrats!",
        message: "You're now verified.",
        severity: "success",
      })
    );
  }

  /**
   * Listens for success message event.
   * Triggers the verification timer to start when event is received.
   */
  useEffect(() => {
    if (!isVerified) {
      const handleMessage = (event: MessageEvent) => {
        if (
          event?.data === "idenfy-verification-success" &&
          !verificationPingStartedAt
        ) {
          dispatch(startVerificationTimer());
        }
      };

      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [dispatch, isVerified, verificationPingStartedAt]);

  /**
   * Requests profile information at 1 minute interval on success page.
   * Clears interval when it has been more than 20 minutes or user is verified.
   */
  useEffect(() => {
    if (verificationPingStartedAt) {
      const TWENTY_MINUTES = 20 * 60 * 1000;
      const pingExpiry = verificationPingStartedAt + TWENTY_MINUTES;
      const hasExceededAllowedTime = verificationPingStartedAt > pingExpiry;
      const verificationStatusInterval = setInterval(() => {
        dispatch(sessionApi.endpoints.getProfile.initiate());
      }, 60000);

      if (hasExceededAllowedTime || isVerified) {
        clearInterval(verificationStatusInterval);
      }

      return () => clearInterval(verificationStatusInterval);
    }
  }, [dispatch, isVerified, verificationPingStartedAt]);

  return null;
};

export default IdenfyModal;
