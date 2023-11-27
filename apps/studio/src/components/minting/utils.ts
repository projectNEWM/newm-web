import { CollaboratorInfo, Collaborators } from "@newm.io/studio/modules/song";

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
    firstName: collaborator.user.firstName,
    lastName: collaborator.user.lastName,
    pictureUrl: collaborator.user.pictureUrl,
    email: collaborator.email,
  };
};
