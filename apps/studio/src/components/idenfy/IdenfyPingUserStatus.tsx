import { FunctionComponent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { setToastMessage } from "../../modules/ui";
import {
  VerificationStatus,
  emptyProfile,
  removeVerificationTimer,
  selectSession,
  startVerificationTimer,
  useGetProfileQuery,
} from "../../modules/session";
import { useAppDispatch, useAppSelector } from "../../common";

const IdenfyModal: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectSession);

  const [currentPollingInterval, setPollingInterval] = useState<
    number | undefined
  >();

  const { data: { verificationStatus } = emptyProfile } = useGetProfileQuery(
    undefined,
    { pollingInterval: currentPollingInterval, skip: !isLoggedIn }
  );

  const { verificationPingStartedAt } = useAppSelector(selectSession);

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
   * Sets fetch profile information polling interval at 20 seconds interval on success page.
   * Clears interval when it has been more than 20 minutes or user is verified.
   */
  useEffect(() => {
    if (verificationPingStartedAt) {
      const TWENTY_MINUTES = 20 * 60 * 1000;
      const pingExpiry = verificationPingStartedAt + TWENTY_MINUTES;
      const hasExceededAllowedTime = verificationPingStartedAt > pingExpiry;

      setPollingInterval(20000);

      if (hasExceededAllowedTime || isVerified) {
        setPollingInterval(undefined);
      }
    }
  }, [dispatch, isVerified, verificationPingStartedAt]);

  return null;
};

export default IdenfyModal;
