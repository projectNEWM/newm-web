import {
  Profile,
  VerificationStatus,
} from "@newm.io/studio/modules/session/types";

export const mockProfile: Profile = {
  id: "ABCD1234",
  oauthId: "",
  oauthType: "",
  email: "example@email.com",
  firstName: "John",
  lastName: "Smith",
  nickname: "Johnny",
  bannerUrl: "https://newm.io/image",
  role: "Producer",
  genre: "Instrumental",
  verificationStatus: VerificationStatus.Unverified,
  biography: "biography",
  location: "Spain",
  websiteUrl: "https://newm.io/",
  twitterUrl: "https://newm.io/",
  instagramUrl: "https://newm.io/",
  companyIpRights: false,
  companyName: "",
  companyLogoUrl: "",
};
