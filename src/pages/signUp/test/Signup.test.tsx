import { renderWithContext } from "common";
import SignUp from "../SignUp";

describe("<SignUp />", () => {
  it("renders social login buttons", () => {
    const { queryByLabelText } = renderWithContext(<SignUp />);

    expect(queryByLabelText("google authorization")).toBeTruthy();
    expect(queryByLabelText("facebook authorization")).toBeTruthy();
    expect(queryByLabelText("linkedin authorization")).toBeTruthy();
  });
});
