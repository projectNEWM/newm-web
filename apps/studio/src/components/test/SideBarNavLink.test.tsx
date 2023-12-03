import { renderWithContext } from "../../common";
import * as routerUtils from "react-router-dom";
import { Upload as UploadIcon } from "@mui/icons-material";
import theme from "@newm-web/theme";
import { SideBarNavLink } from "@newm-web/elements";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useMatch: jest.fn(),
}));

// Mock MUI icon component
jest.mock("@mui/icons-material", () => ({
  ...jest.requireActual("@mui/icons-material"),
  Upload: jest.fn(),
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
        <SideBarNavLink label="Example" Icon={UploadIcon} to="/example" />
      );

      expect(getByTestId("navStyled")).toHaveStyle(
        `background: ${theme.colors.activeBackground};`
      );
    });
  });

  describe("when the current route is not a match", () => {
    it("does not highlight the nav link background", () => {
      jest.spyOn(routerUtils, "useMatch").mockImplementation(() => null);

      const { getByTestId } = renderWithContext(
        <SideBarNavLink label="Example" Icon={UploadIcon} to="/example" />
      );

      expect(getByTestId("navStyled")).toHaveStyle("background: transparent;");
    });
  });
});
