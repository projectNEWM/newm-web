import { mockProfile, renderWithContext } from "common";
import { Profile, sessionApi } from "modules/session";
import { SideBar } from "../SideBar";

const renderSidebar = (profileData: Partial<Profile> = {}) => {
  const mockResponse = {
    data: {
      ...mockProfile,
      ...profileData,
    },
  } as any; // eslint-disable-line

  jest
    .spyOn(sessionApi.endpoints.getProfile, "initiate")
    .mockImplementation(jest.fn(() => mockResponse));

  return renderWithContext(<SideBar setMobileOpen={ () => 1 } />);
};

describe("<Sidebar>", () => {
  it("renders the profile nickname", () => {
    const { queryByText } = renderSidebar({ nickname: "Sushi" });

    expect(queryByText("Sushi")).toBeTruthy();
  });

  describe("if a `profileUrl` field is present", () => {
    it("renders the profile image", () => {
      const { queryByLabelText } = renderSidebar({
        pictureUrl: "https://www.example.com/image.png",
      });

      expect(queryByLabelText("profile image")).toBeTruthy();
    });
  });

  describe("if a `profileUrl` field is not present", () => {
    it("does not render the profile image", () => {
      const { queryByLabelText } = renderSidebar();

      expect(queryByLabelText("profile image")).toBeFalsy();
    });
  });
});
