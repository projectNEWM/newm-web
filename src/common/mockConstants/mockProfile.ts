import { Profile, VerificationStatus } from "modules/session/types";

export const mockProfile: Profile = {
  id: "ABCD1234",
  oauthId: "",
  oauthType: "",
  email: "example@email.com",
  firstName: "John",
  lastName: "Smith",
  nickname: "Johnny",
  location: "",
  pictureUrl: "",
  bannerUrl: "",
  role: "Producer",
  genre: "Instrumental",
  verificationStatus: VerificationStatus.Unverified,
};
