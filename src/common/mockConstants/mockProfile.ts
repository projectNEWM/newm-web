import { Profile, VerificationStatus } from "modules/session/types";

export const mockProfile: Profile = {
  id: "ABCD1234",
  oauthId: "",
  oauthType: "",
  email: "example@email.com",
  firstName: "John",
  lastName: "Smith",
  nickname: "Johnny",
  pictureUrl: "",
  heroImageUrl: "",
  role: "Producer",
  genre: "Instrumental",
  verificationStatus: VerificationStatus.Unverified,
};
