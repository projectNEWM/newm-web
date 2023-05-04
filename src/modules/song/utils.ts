import { uniq } from "lodash";
import { Collaborator, Creditor, Owner } from "./types";

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
