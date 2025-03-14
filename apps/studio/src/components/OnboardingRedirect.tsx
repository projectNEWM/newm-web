import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../common";
import {
  emptyProfile,
  selectSession,
  useGetProfileQuery,
} from "../modules/session";

/**
 * Redirects a user to the onboarding flow if they have not gone
 * through it yet.
 */
const OnboardingRedirect: FunctionComponent = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAppSelector(selectSession);
  const {
    data: { firstName, lastName, role } = emptyProfile,
    isLoading,
    error,
  } = useGetProfileQuery(undefined, { skip: !isLoggedIn });

  useEffect(() => {
    if (
      !isLoading &&
      isLoggedIn &&
      !error &&
      (!firstName || !lastName || !role)
    ) {
      navigate("/create-profile");
    }

    // useNavigate doesn't return a memoized function. Omitting from
    // dependency list to prevent this from being called on each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, firstName, lastName, role, error, isLoading]);

  return null;
};

export default OnboardingRedirect;
