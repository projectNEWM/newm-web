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
  role: "Producer",
  genre: "Instrumental",
  verificationStatus: VerificationStatus.Unverified,
  biography: "biography",
  bannerUrl: "https://newm.io/",
  location: "Remote, Earth",
  websiteUrl: "https://newm.io/",
  twitterUrl: "https://newm.io/",
  instagramUrl: "https://newm.io/",
  isIpRightsUnderCompany: false,
  companyName: "",
  companyImageUrl: "",
};
