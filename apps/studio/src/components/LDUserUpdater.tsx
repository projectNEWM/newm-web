import { useEffect } from "react";
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
 * @returns {null} - This component does not render anything on the screen.
 */
const LDUserUpdater = () => {
  const { isLoggedIn } = useAppSelector(selectSession);

  // Retrieve the user's profile data if they are logged in.
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !isLoggedIn,
  });

  const ldClient = useLDClient();

  useEffect(() => {
    // Update the LaunchDarkly client with the user's profile if available.
    if (profile && ldClient) {
      ldClient.identify({
        email: profile.email,
        key: profile.id,
        kind: "user",
        lastName: profile.lastName,
        name: profile.firstName,
        nickname: profile.nickname,
      });
    }
  }, [profile, ldClient]);

  return null;
};

export default LDUserUpdater;
