import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { uniq } from "lodash";
import {
  enableWallet,
  getWalletChangeAddress,
  signWalletTransaction,
} from "@newm.io/cardano-dapp-wallet-connector";
import { SilentError } from "common";
import {
  Collaboration,
  CollaborationStatus,
  Collaborator,
  CreateCollaborationRequest,
  Creditor,
  Featured,
  Invite,
  MintingStatus,
  Owner,
} from "./types";
import { extendedApi as songApi } from "./api";
import { sessionApi } from "../session";

const EDITABLE_SONG_STATUSES = [
  MintingStatus.Undistributed,
  MintingStatus.StreamTokenAgreementApproved,
];
const EDITABLE_COLLABORATOR_STATUSES = [
  CollaborationStatus.Editing,
  CollaborationStatus.Rejected,
];

/**
 * Generates a list of collaborators from a list of owners, creditors,
 * and featured artists.
 *
 * @param owners a list of users with initial ownership of the song royalties
 * @param creditors a list of users displayed in the song credits
 * @param featured a list of users displayed as featured on the song
 * @returns a unified list of collaborators for the song
 */
export const generateCollaborators = (
  owners: ReadonlyArray<Owner>,
  creditors: ReadonlyArray<Creditor>,
  featured: ReadonlyArray<Featured>
): ReadonlyArray<Collaborator> => {
  const emails = uniq([
    ...owners.map(({ email }) => email),
    ...creditors.map(({ email }) => email),
    ...featured.map(({ email }) => email),
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

  const featuredMap: Record<string, Featured> = featured.reduce(
    (acc: Record<string, Featured>, featured: Featured) => {
      acc[featured.email] = featured;

      return acc;
    },
    {}
  );

  return emails.map((email) => {
    const collaborator = {
      ...ownersMap[email],
      ...creditorsMap[email],
      ...featuredMap[email],
    };

    return {
      email,
      role: collaborator.role,
      royaltyRate: collaborator.percentage,
      isCredited: !!collaborator.isCredited,
      isFeatured: !!collaborator.isFeatured,
      isCreator: !!collaborator.isCreator,
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
 * Creates an array of API collaborations from an array of collaborators.
 */
export const mapCollaboratorsToCollaborations = (
  songId: string,
  collaborators: ReadonlyArray<Collaborator>
) => {
  return collaborators.map((collaborator) => ({
    songId,
    email: collaborator.email,
    role: collaborator.role,
    royaltyRate: collaborator.royaltyRate || 0,
    credited: collaborator.isCredited,
    featured: collaborator.isFeatured,
  }));
};

export const getIsOwnerEditable = (
  songStatus: MintingStatus,
  owner: Owner,
  totalNumOwners: number
) => {
  const status = owner.status;
  const isCreator = "isCreator" in owner && !!owner.isCreator;
  const canEditOwnAmount = totalNumOwners > 1 && isCreator;

  // uploader can always edit own amount if song has multiple collabs
  if (canEditOwnAmount) return true;

  // delay between song minting status and collab acceptance status, if the song
  // is not in editable state, but collab is still "editable", disable editing.
  const isEditableSong = EDITABLE_SONG_STATUSES.includes(songStatus);
  if (!isEditableSong && status === CollaborationStatus.Editing) return false;

  // allow editing if collab has "Rejected" or "Editing" status
  return EDITABLE_COLLABORATOR_STATUSES.includes(status);
};

/**
 * Allow editing a credited collaborator if they have rejected
 * the collaboration request.
 */
export const getIsCreditorEditable = (
  songStatus: MintingStatus,
  creditor: Creditor
) => {
  const status = creditor.status;

  // delay between song minting status and collab acceptance status, if the song
  // is not in editable state, but collab is still "editable", disable editing.
  const isEditableSong = EDITABLE_SONG_STATUSES.includes(songStatus);
  if (!isEditableSong && status === CollaborationStatus.Editing) return false;

  // Allow editing if collab has "Rejected" or "Editing" status
  return EDITABLE_COLLABORATOR_STATUSES.includes(status);
};

export const getIsSongDeletable = (status: MintingStatus) => {
  return [
    MintingStatus.Undistributed,
    MintingStatus.StreamTokenAgreementApproved,
    MintingStatus.MintingPaymentRequested,
  ].includes(status);
};

/**
 * Creates an Invite object from a Collaboration object.
 *
 * @param collaboration - The collaboration object to create an invite from.
 * @param dispatch - The dispatch function from Redux.
 *
 * @throws Will throw an error if getting song data or user data fails.
 *
 * @returns A promise that resolves to an Invite object.
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

/**
 * Converts milliseconds into a song format (m:ss).
 *
 * @param {number} milliseconds - The time in milliseconds.
 *
 * @returns {string} The time in 'm:ss' format.
 */
export const convertMillisecondsToSongFormat = (
  milliseconds: number
): string => {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Allows the user to submit a payment to cover the cost of minting
 * a song using their Cardano wallet.
 *
 * @param songId id of the song to submit a minting payment for
 * @param dispatch thunk dispatch helper
 */
export const submitMintSongPayment = async (
  songId: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  const wallet = await enableWallet();

  const getPaymentResp = await dispatch(
    songApi.endpoints.getMintSongPayment.initiate(songId)
  );

  if ("error" in getPaymentResp || !getPaymentResp.data) {
    throw new SilentError();
  }

  const paymentHex = getPaymentResp.data.cborHex;
  const utxoCborHexList = await wallet.getUtxos(paymentHex);
  const changeAddress = await getWalletChangeAddress(wallet);

  const createPaymentResp = await dispatch(
    songApi.endpoints.createMintSongPayment.initiate({
      songId,
      changeAddress,
      utxoCborHexList,
    })
  );

  if ("error" in createPaymentResp || !createPaymentResp.data) {
    throw new SilentError();
  }

  const tx = createPaymentResp.data.cborHex;
  const signedTx = await signWalletTransaction(wallet, tx);
  await wallet.submitTx(signedTx);

  const txResp = await dispatch(
    songApi.endpoints.submitMintSongPayment.initiate({
      songId,
      cborHex: signedTx,
    })
  );

  if ("error" in txResp) {
    throw new SilentError();
  }
};

/**
 * Returns true if an invite includes ownership of a song.
 * @param invites array of invites for the user
 * @returns true if any of invites contains an ownership amount greater than 0
 */
export const getHasOwnershipInvite = (
  invites: ReadonlyArray<Invite>
): boolean => {
  return !!invites.find((inv) => !!inv.royaltyRate);
};
