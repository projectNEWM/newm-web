import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { uniq } from "lodash";
import { Collaboration, Collaborator, Creditor, Invite, Owner } from "./types";
import { extendedApi as songApi } from "./api";
import { sessionApi } from "../session";

/**
 * Generates a list of collaborators from a list of owners and creditors.
 *
 * @param owners a list of users with initial ownership of the song royalties
 * @param creditors a list of users displayed in the song credits
 * @returns a unified list of collaborators for the song
 */
export const generateCollaborators = (
  owners: ReadonlyArray<Owner>,
  creditors: ReadonlyArray<Creditor>
): ReadonlyArray<Collaborator> => {
  const emails = uniq([
    ...owners.map(({ email }) => email),
    ...creditors.map(({ email }) => email),
  ]);

  const ownersMap: Record<string, Owner> = owners.reduce(
    (acc: Record<string, Owner>, owner: Owner) => {
      acc[owner.email] = owner;

      return acc;
    },
    {}
  );

  const creditorsMap: Record<string, Creditor> = creditors.reduce(
    (acc: Record<string, Creditor>, creditor: Creditor) => {
      acc[creditor.email] = creditor;

      return acc;
    },
    {}
  );

  return emails.map((email) => {
    const isOwner = !!ownersMap[email];
    const isCreditor = !!creditorsMap[email];

    return {
      email,
      role: isOwner ? ownersMap[email].role : creditorsMap[email].role,
      royaltyRate: isOwner ? ownersMap[email].percentage : undefined,
      isCredited: !!isCreditor,
    };
  });
};

/**
 * Creates an Invite object from a Collaboration object.
 *
 * @param {Collaboration} collaboration - The collaboration object to create an invite from.
 * @param {ThunkDispatch<unknown, unknown, AnyAction>} dispatch - The dispatch function from Redux.
 *
 * @throws Will throw an error if getting song data or user data fails.
 *
 * @returns {Promise<Invite>} A promise that resolves to an Invite object.
 */
export const createInvite = async (
  collaboration: Collaboration,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<Invite> => {
  const getSongResponse = await dispatch(
    songApi.endpoints.getSong.initiate(collaboration.songId)
  );

  const songData = getSongResponse.data;

  if ("error" in getSongResponse || !songData) {
    throw new Error("Error getting song data");
  }

  const getUserResponse = await dispatch(
    sessionApi.endpoints.getUser.initiate({ userId: songData.ownerId })
  );
  const userData = getUserResponse.data;

  if ("error" in getUserResponse || !userData) {
    throw new Error("Error getting user data");
  }

  return {
    collaborationId: collaboration.id,
    coverArtUrl: songData.coverArtUrl,
    duration: songData.duration,
    firstName: userData.firstName,
    lastName: userData.lastName,
    pictureUrl: userData.pictureUrl,
    role: collaboration.role,
    royaltyRate: collaboration.royaltyRate,
    status: collaboration.status,
    title: songData.title,
  };
};
