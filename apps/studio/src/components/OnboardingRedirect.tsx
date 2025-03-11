import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "../common";
import { logOutExpiredSession } from "../api/actions";
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
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector(selectSession);
  const {
    data: { firstName, lastName, role } = emptyProfile,
    isLoading,
    error,
  } = useGetProfileQuery(undefined, { skip: !isLoggedIn });

  useEffect(() => {
    // Exit if still loading or not logged in.
    if (isLoading || !isLoggedIn) return;

    // If there’s a 401 error (expired token), exit early.
    if (error && (error as FetchBaseQueryError).status === 401) {
      dispatch(logOutExpiredSession());
      return;
    }

    // If the user’s profile is incomplete, navigate to the create-profile page.
    if (!firstName || !lastName || !role) {
      navigate("/create-profile");
    }

    // useNavigate doesn't return memomized function. Ommiting from
    // dependency list to prevent this from being called on each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, firstName, lastName, role]);

  return null;
};

export default OnboardingRedirect;
