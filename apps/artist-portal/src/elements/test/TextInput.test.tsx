import { renderWithContext } from "@newm.io/studio/common";
import TextInput from "../TextInput";

describe("<TextInput>", () => {
  it("renders the content correctly", () => {
    const { queryByText } = renderWithContext(<TextInput label="Example label" errorMessage="Example error message" />);

    expect(queryByText("Example label")).toBeTruthy();
    expect(queryByText("Example error message")).toBeTruthy();
  });
});
