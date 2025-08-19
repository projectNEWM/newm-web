import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { uniq } from "lodash";
import {
  enableWallet,
  getWalletChangeAddress,
  signWalletTransaction,
} from "@newm.io/cardano-dapp-wallet-connector";
import { SilentError } from "@newm-web/utils";
import { MintingStatus } from "@newm-web/types";
import {
  Collaboration,
  CollaborationStatus,
  Collaborator,
  CollaboratorInfo,
  Collaborators,
  CreateCollaborationRequest,
  Creditor,
  Featured,
  Invite,
  Owner,
  PaymentType,
} from "./types";
import { extendedApi as songApi } from "./api";
import { sessionApi } from "../session";
import { setIsPayPalModalOpen } from "../ui";
import {
  closePayPalPopup,
  getPayPalPopup,
  navigatePayPalPopup,
} from "../../common";

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
      isCreator: !!collaborator.isCreator,
      isCredited: !!collaborator.isCredited,
      isFeatured: !!collaborator.isFeatured,
      role: collaborator.role,
      royaltyRate: collaborator.percentage,
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
    credited: collaborator.isCredited,
    email: collaborator.email,
    featured: collaborator.isFeatured,
    role: collaborator.role,
    ...(collaborator.royaltyRate
      ? { royaltyRate: collaborator.royaltyRate }
      : {}),
    songId,
  }));
};

/**
 * Allows editing an owner if they are the user and there is more than
 * one collaborator, or if the collaborator has an editable status.
 */
export const getIsOwnerEditable = (
  owner: Owner,
  hasSomeoneRejected: boolean
) => {
  const ownerStatus = owner.status;
  const isCreator = "isCreator" in owner && !!owner.isCreator;
  const canEditOwnAmount = hasSomeoneRejected && isCreator;
  const isEditableStatus = EDITABLE_COLLABORATOR_STATUSES.includes(ownerStatus);

  return canEditOwnAmount || isEditableStatus;
};

/**
 * Allows editing a credited collaborator if they have an editable status.
 */
export const getIsCreditorEditable = (creditor: Creditor) => {
  const status = creditor.status;
  const isEditableStatus = EDITABLE_COLLABORATOR_STATUSES.includes(status);

  return isEditableStatus;
};

/**
 * Determines whether a song can be deleted, depending on the
 * current minting status of the song.
 */
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
 * @param paymentType type of payment that will be used for minting
 */
export const submitMintSongPayment = async (
  songId: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  paymentType: PaymentType
) => {
  const wallet = await enableWallet();

  const getPaymentResp = await dispatch(
    songApi.endpoints.getMintSongPayment.initiate({ paymentType, songId })
  );

  if ("error" in getPaymentResp || !getPaymentResp.data) {
    throw new SilentError();
  }

  const paymentOptionSelected = getPaymentResp.data.mintPaymentOptions.find(
    (option) => option.paymentType === paymentType
  );

  if (!paymentOptionSelected) {
    throw new SilentError(
      "No valid payment option found for the selected payment type."
    );
  }

  const paymentHex = paymentOptionSelected.cborHex;

  const utxoCborHexList = await wallet.getUtxos(paymentHex);
  const changeAddress = await getWalletChangeAddress(wallet);

  const createPaymentResp = await dispatch(
    songApi.endpoints.createMintSongPayment.initiate({
      changeAddress,
      songId,
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
      cborHex: signedTx,
      songId,
    })
  );

  if ("error" in txResp) {
    throw new SilentError();
  }
};

/**
 * Allows user to submit PayPal payment for minting a song.
 * This function will open a PayPal payment window
 * and will close it once the payment is successful or cancelled.
 *
 * @param songId id of the song to submit a minting payment for
 * @param dispatch thunk dispatch helper
 * @returns a promise that resolves when the payment is submitted
 * @throws Will throw an error if the payment submission fails.
 * */
export const submitPayPalPayment = async (
  songId: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const getPaymentResp = await dispatch(
      songApi.endpoints.createPayPalOrderPayment.initiate({ songId })
    );

    if ("error" in getPaymentResp || !getPaymentResp.data) {
      closePayPalPopup();
      reject(new SilentError());
      return;
    }

    const { checkoutUrl, orderId } = getPaymentResp.data;

    // Show overlay while the popup is in use
    dispatch(setIsPayPalModalOpen(true));
    navigatePayPalPopup(checkoutUrl);

    // Cleanup PayPal process to remove modal, stop watchers, and close pop-up
    const cleanUpPayPalPopup = () => {
      if (paypalWatcher !== null) {
        clearInterval(paypalWatcher);
      }
      if (getPayPalPopup()) {
        closePayPalPopup();
      }

      window.removeEventListener("message", handlePayPalMessage);

      dispatch(setIsPayPalModalOpen(false));
    };

    // Handle any post messages that are derived from the pop-up
    const handlePayPalMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data === "paypal-payment-success") {
        try {
          const submitResp = await dispatch(
            songApi.endpoints.submitPayPalOrderPayment.initiate({ orderId })
          );
          if ("error" in submitResp) {
            reject(new SilentError());
          } else {
            resolve();
          }
        } catch (e) {
          reject(e);
        } finally {
          cleanUpPayPalPopup();
        }
      } else if (event.data === "paypal-popup-cancelled") {
        // Cancelled page button is clicked
        cleanUpPayPalPopup();
        reject(new Error("PayPal payment cancelled"));
      }
    };

    window.addEventListener("message", handlePayPalMessage);

    // Detect manual close before redirect callback happens
    const paypalWatcher = setInterval(() => {
      if (!getPayPalPopup()) {
        cleanUpPayPalPopup();
        reject(new Error("PayPal payment cancelled"));
      }
    }, 500);
  });
};

/** Returns true if an invite includes ownership of a song.
 * @param invites array of invites for the user
 * @returns true if any of invites contains an ownership amount greater than 0
 */
export const getHasOwnershipInvite = (
  invites: ReadonlyArray<Invite>
): boolean => {
  return !!invites.find((inv) => !!inv.royaltyRate);
};

/**
 * Returns the collaborator details based on the provided email.
 *
 * @param {string} email - The email of the collaborator to search for.
 * @param {Collaborators[] | undefined} collaboratorsData - The array of collaborators data.
 *
 * @returns {Partial<CollaboratorInfo>} The collaborator's details if found; otherwise, an empty object.
 */
export const getCollaboratorInfo = (
  email: string,
  collaboratorsData?: Collaborators[]
): Partial<CollaboratorInfo> => {
  const collaborator = collaboratorsData?.find((item) => item.email === email);

  if (!collaborator?.user) return {};

  return {
    email: collaborator.email,
    firstName: collaborator.user.firstName,
    lastName: collaborator.user.lastName,
    nickname: collaborator.user.nickname,
    pictureUrl: collaborator.user.pictureUrl,
  };
};
