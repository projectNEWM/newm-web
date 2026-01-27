import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { selectSession, useGetProfileQuery } from "../modules/session";
import { useAppSelector } from "../common";

/**
 *
 * This component is responsible for updating the LaunchDarkly context with user information
 * after the user has logged in. It listens for changes in the user's profile and updates
 * the LaunchDarkly client context accordingly, which enables personalized feature flags for the user.
 *
 * @component
 */
const LDUserUpdater: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAppSelector(selectSession);
  const [isLDReady, setIsLDReady] = useState(!isLoggedIn);
  const hasIdentified = useRef(false);

  // Retrieve the user's profile data if they are logged in.
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !isLoggedIn,
  });

  const ldClient = useLDClient();

  useEffect(() => {
    // Reset when user logs out
    if (!isLoggedIn) {
      setIsLDReady(true);
      hasIdentified.current = false;
      return;
    }

    // Update the LaunchDarkly client with the user's profile if available.
    if (profile && ldClient && !hasIdentified.current) {
      const identifyUser = async () => {
        hasIdentified.current = true;
        await ldClient.identify({
          email: profile.email,
          key: profile.id,
          kind: "user",
          lastName: profile.lastName,
          name: profile.firstName,
          nickname: profile.nickname,
        });
        setIsLDReady(true);
      };

      identifyUser();
    }
  }, [profile, ldClient, isLoggedIn]);

  if (!isLDReady) {
    return null;
  }

  return children;
};

export default LDUserUpdater;
