import { mockSession, renderWithContext } from "common";
import { Profile } from "modules/session";
import SideBar from "../SideBar";

const renderSidebar = (profileData: Partial<Profile> = {}) => {
  return renderWithContext(<SideBar />, {
    preloadedState: {
      session: {
        ...mockSession,
        profile: {
          ...mockSession.profile,
          ...profileData,
        },
      },
    },
  });
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
