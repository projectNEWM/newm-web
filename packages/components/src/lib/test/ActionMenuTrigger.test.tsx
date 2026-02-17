import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { renderWithContext } from "./utils/render";
import ActionMenuTrigger from "../ActionMenuTrigger";

describe("<ActionMenuTrigger />", () => {
  it("renders the default trigger button", () => {
    renderWithContext(<ActionMenuTrigger onClick={ jest.fn() } />);

    expect(
      screen.getByRole("button", { name: "Open actions" })
    ).toBeInTheDocument();
  });

  it("invokes onClick when pressed", async () => {
    const onClick = jest.fn();

    renderWithContext(<ActionMenuTrigger onClick={ onClick } />);

    await userEvent.click(screen.getByRole("button", { name: "Open actions" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports a custom aria label", () => {
    renderWithContext(
      <ActionMenuTrigger ariaLabel="Row actions" onClick={ jest.fn() } />
    );

    expect(
      screen.getByRole("button", { name: "Row actions" })
    ).toBeInTheDocument();
  });
});
