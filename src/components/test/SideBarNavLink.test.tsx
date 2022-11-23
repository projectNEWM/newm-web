import { renderWithContext } from "common";
import * as routerUtils from "react-router-dom";
import UploadIcon from "assets/images/UploadIcon";
import SideBarNavLink from "../home/SideBarNavLink";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useMatch: jest.fn(),
}));

const mockMatch = {
  params: {},
  pathname: "/example",
  pathnameBase: "",
  pattern: { path: "/example", caseSensitive: false, end: true },
};

describe("<SideBarNavLink>", () => {
  describe("when the current route is a match", () => {
    it("highlights the nav link background", () => {
      jest.spyOn(routerUtils, "useMatch").mockImplementation(() => mockMatch);

      const { getByTestId } = renderWithContext(
        <SideBarNavLink label="Example" icon={ <UploadIcon /> } to="/example" />
      );

      expect(getByTestId("navStyled")).toHaveStyle(
        "background: rgba(255, 255, 255, 0.1);"
      );
    });
  });

  describe("when the current route is not a match", () => {
    it("does not highlight the nav link background", () => {
      jest.spyOn(routerUtils, "useMatch").mockImplementation(() => null);

      const { getByTestId } = renderWithContext(
        <SideBarNavLink label="Example" icon={ <UploadIcon /> } to="/example" />
      );

      expect(getByTestId("navStyled")).toHaveStyle("background: transparent;");
    });
  });
});
