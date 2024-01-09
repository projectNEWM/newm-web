import { Profile, VerificationStatus } from "../../modules/session/types";

export const mockProfile: Profile = {
  bannerUrl: "https://newm.io/image",
  biography: "biography",
  companyIpRights: false,
  companyLogoUrl: "",
  companyName: "",
  email: "example@email.com",
  firstName: "John",
  genre: "Instrumental",
  id: "ABCD1234",
  instagramUrl: "https://newm.io/",
  lastName: "Smith",
  location: "Spain",
  nickname: "Johnny",
  oauthId: "",
  oauthType: "",
  role: "Producer",
  twitterUrl: "https://newm.io/",
  verificationStatus: VerificationStatus.Unverified,
  websiteUrl: "https://newm.io/",
};
