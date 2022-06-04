import { Profile, SessionState } from "modules/session";

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
};

export const mockSession: SessionState = {
  isLoggedIn: true,
  errorMessage: "",
  profile: mockProfile,
};

export const mockFile = {
  name: "hello-world.txt",
  size: 1000,
  type: "",
  webkitRelativePath: "/",
  lastModified: 1234567890,
  arrayBuffer: jest.fn(),
  slice: jest.fn(),
  stream: jest.fn(),
  text: jest.fn(),
};
