import { render } from "@testing-library/react";
import TextInput from "../TextInput";

describe("<TextInput>", () => {
  it("renders the content correctly", () => {
    const { queryByText } = render(
      <TextInput label="Example label" errorMessage="Example error message" />
    );

    expect(queryByText("Example label")).toBeTruthy();
    expect(queryByText("Example error message")).toBeTruthy();
  });
});
