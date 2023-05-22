import { uniq } from "lodash";
import {
  Collaboration,
  Collaborator,
  CreateCollaborationRequest,
  Creditor,
  Owner,
} from "./types";

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
 * Checks which collaborations exist in the current collaborations but
 * not in the new collaborations and returns them as collaborations to delete.
 *
 * @param currentCollabs collaborations that currently exist for the song
 * @param newCollabs updated collaborations for the song
 * @returns a list of collaborations to delete
 */
export const getCollaborationsToDelete = (
  currentCollabs: ReadonlyArray<Collaboration>,
  newCollabs: ReadonlyArray<CreateCollaborationRequest>
) => {
  return currentCollabs.reduce((result, collab) => {
    if (!newCollabs.map(({ email }) => email).includes(collab.email)) {
      return [collab.id, ...result];
    }

    return result;
  }, [] as Array<string>);
};

/**
 * Checks which collaborations exist in the existing collaborations
 * and the new collaborations and returns them as collaborations to update.
 *
 * @param currentCollabs collaborations that currently exist for the song
 * @param newCollabs updated collaborations for the song
 * @returns a list of collaborations to update
 */
export const getCollaborationsToUpdate = (
  currentCollabs: ReadonlyArray<Collaboration>,
  newCollabs: ReadonlyArray<Partial<Collaboration>>
) => {
  return currentCollabs.reduce((result, collab) => {
    const newCollab = newCollabs.find(({ email }) => collab.email === email);

    if (newCollab) {
      const updatedCollab = { ...collab, ...newCollab };
      return [updatedCollab, ...result];
    }

    return result;
  }, [] as Array<Collaboration>);
};

/**
 * Checks which collaborations are in the new array but not in the old array
 * and returns them as new collaborations to create.
 *
 * @param currentCollabs collaborations that currently exist for the song
 * @param newCollabs updated collaborations for the song
 * @returns a list of collaborations to create
 */
export const getCollaborationsToCreate = (
  currentCollabs: ReadonlyArray<Collaboration>,
  newCollabs: ReadonlyArray<CreateCollaborationRequest>
) => {
  return newCollabs.reduce((result, collab) => {
    if (
      collab.email &&
      !currentCollabs.map(({ email }) => email).includes(collab.email)
    ) {
      return [collab, ...result];
    }

    return result;
  }, [] as Array<CreateCollaborationRequest>);
};

/**
 * Creates an array of collaborations from an array of collaborators.
 */
export const mapCollaboratorsToCollaborations = (
  songId: string,
  collaborators: ReadonlyArray<Collaborator>
) => {
  return collaborators.map((collaborator) => ({
    songId,
    email: collaborator.email,
    role: collaborator.role,
    royaltyRate: collaborator.royaltyRate,
    credited: collaborator.isCredited,
  }));
};
