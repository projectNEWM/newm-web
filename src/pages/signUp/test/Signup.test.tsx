import { renderWithContext } from "common";
import SignUp from "../SignUp";

// mock useLocation for Wizard form
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/sign-up",
  }),
}));

describe("<SignUp />", () => {
  it("renders social login buttons", () => {
    const { queryByLabelText } = renderWithContext(<SignUp />);

    expect(queryByLabelText("google authorization")).toBeTruthy();
    expect(queryByLabelText("facebook authorization")).toBeTruthy();
    expect(queryByLabelText("linkedin authorization")).toBeTruthy();
  });
});
