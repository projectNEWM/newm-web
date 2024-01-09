import { render } from "@testing-library/react";
import TextInput from "../TextInput";

describe("<TextInput>", () => {
  it("renders the content correctly", () => {
    const { queryByText } = render(
      <TextInput errorMessage="Example error message" label="Example label" />
    );

    expect(queryByText("Example label")).toBeTruthy();
    expect(queryByText("Example error message")).toBeTruthy();
  });
});
