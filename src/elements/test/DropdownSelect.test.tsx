import { screen } from "@testing-library/react";
import { renderWithContext } from "common";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import DropdownSelect from "../DropdownSelect";

describe("<DropdownSelect>", () => {
  const data = [
    { id: 1, name: "Alternative", value: "Alternative" },
    { id: 2, name: "Anime", value: "Anime" },
    { id: 3, name: "Blues", value: "Blues" },
    { id: 4, name: "Children's", value: "Children" },
    { id: 5, name: "Classical", value: "Classical" },
    { id: 6, name: "Comedy", value: "Comedy" },
    { id: 7, name: "Lofi", value: "Lofi" },
  ];

  const renderComponent = async (propOverrides = {}) => {
    const props = {
      disabled: undefined,
      errorMessage: undefined,
      label: "Label",
      name: "name",
      noResultsText: undefined,
      options: data,
      placeholder: undefined,
      ...propOverrides,
    };

    return await renderWithContext(<DropdownSelect { ...props } />);
  };

  it("renders with default props when only required props are provided", () => {
    renderComponent();

    const dropDown = screen.getByRole("combobox");
    const input = screen.getByRole("textbox");

    expect(dropDown).toBeVisible();
    expect(dropDown).toHaveTextContent("Label");
    expect(input).toHaveAttribute("name");
    expect(input).toHaveAttribute("value");
  });

  it("displays options available", () => {
    renderComponent({ placeholder: "Placeholder" });

    const input = screen.getByPlaceholderText("Placeholder");

    expect(screen.queryByText("Alternative")).toBeNull();

    userEvent.click(input);

    const availableOptions = screen.getAllByRole("option").length;

    expect(screen.getByText("Alternative")).toBeInTheDocument();
    expect(availableOptions).toBe(7);
    expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
  });

  it("filters results as the user types", () => {
    renderComponent({ placeholder: "Placeholder" });

    const input = screen.getByPlaceholderText("Placeholder");
    let availableOptions;

    userEvent.type(input, "a");
    availableOptions = screen.getAllByRole("option").length;
    expect(availableOptions).toBe(3);

    userEvent.type(input, "l");
    availableOptions = screen.getAllByRole("option").length;
    expect(availableOptions).toBe(2);

    userEvent.type(input, "t");
    availableOptions = screen.getAllByRole("option").length;
    expect(screen.getByText("Alternative")).toBeInTheDocument();
    expect(availableOptions).toBe(1);
  });

  it("changes the value of the input when an option is selected", () => {
    renderComponent();

    userEvent.click(screen.getByRole("textbox"));
    userEvent.click(screen.getByText("Alternative"));

    expect(screen.getByDisplayValue("Alternative")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("Anime")).toBeNull();
  });

  it("displays default text when no options are available", () => {
    renderComponent({ options: [] });

    userEvent.click(screen.getByRole("textbox"));

    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("displays custom text when no options are avaialble", () => {
    renderComponent({
      noResultsText: "Nothing to see here",
      placeholder: "Placeholder",
    });

    const input = screen.getByPlaceholderText("Placeholder");

    userEvent.type(input, "invalidSearch");

    expect(screen.getByText("Nothing to see here")).toBeInTheDocument();
  });

  it("does not display options when disabled", () => {
    renderComponent({ disabled: true, placeholder: "Placeholder" });

    userEvent.click(screen.getByPlaceholderText("Placeholder"));

    expect(screen.queryByDisplayValue("Alternative")).toBeNull();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  it("displays error message when it is passed", () => {
    renderComponent({ errorMessage: "error message" });

    expect(screen.getByText("error message")).toBeInTheDocument();
  });
});
