import { renderWithContext } from "common";
import SignUp from "../SignUp";

describe("<SignUp />", () => {
  it("renders social login buttons", () => {
    const { getByLabelText } = renderWithContext(<SignUp />);

    expect(getByLabelText("google authorization")).toBeTruthy();
    expect(getByLabelText("facebook authorization")).toBeTruthy();
    expect(getByLabelText("linkedin authorization")).toBeTruthy();
  });
});
