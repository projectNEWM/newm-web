import { renderWithContext, withFormik } from "common";
import FilteredTagsField from "../form/FilteredTagsField";

describe("<FilteredTagsField />", () => {
  it("displays all tags if form value is blank", () => {
    const { queryByText } = renderWithContext(
      withFormik(
        <FilteredTagsField name="example" tags={ ["hello", "world"] } />,
        {
          initialValues: { example: "" },
          onSubmit: jest.fn(),
        }
      )
    );

    expect(queryByText("hello")).toBeTruthy();
    expect(queryByText("world")).toBeTruthy();
  });

  it("only displays matching tags if form value is present", () => {
    const { queryByText } = renderWithContext(
      withFormik(
        <FilteredTagsField name="example" tags={ ["hello", "world"] } />,
        {
          initialValues: { example: "he" },
          onSubmit: jest.fn(),
        }
      )
    );

    expect(queryByText("hello")).toBeTruthy();
    expect(queryByText("world")).toBeFalsy();
  });

  it("does not display any tags if form value matches a tag", () => {
    const { queryByText } = renderWithContext(
      withFormik(
        <FilteredTagsField name="example" tags={ ["hello", "world"] } />,
        {
          initialValues: { example: "hello" },
          onSubmit: jest.fn(),
        }
      )
    );

    expect(queryByText("hello")).toBeFalsy();
    expect(queryByText("world")).toBeFalsy();
  });
});
