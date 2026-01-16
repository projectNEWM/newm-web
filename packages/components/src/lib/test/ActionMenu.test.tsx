import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { renderWithContext } from "./utils/render";
import ActionMenu, { ActionMenuItem } from "../ActionMenu";

describe("<ActionMenu />", () => {
  const buildAnchor = () => {
    const anchor = document.createElement("button");
    document.body.appendChild(anchor);
    return anchor;
  };

  const baseItems: ActionMenuItem[] = [
    {
      id: "view-edit",
      label: "View / Edit",
      onClick: jest.fn(),
    },
    {
      id: "delete",
      label: "Delete",
      onClick: jest.fn(),
    },
  ];

  it("renders menu items when open", () => {
    const anchorEl = buildAnchor();

    renderWithContext(
      <ActionMenu
        anchorEl={ anchorEl }
        items={ baseItems }
        open={ true }
        onClose={ jest.fn() }
      />
    );

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "View / Edit" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "Delete" })
    ).toBeInTheDocument();

    document.body.removeChild(anchorEl);
  });

  it("invokes item click and closes by default", async () => {
    const anchorEl = buildAnchor();
    const onClose = jest.fn();
    const onClick = jest.fn();

    renderWithContext(
      <ActionMenu
        anchorEl={ anchorEl }
        items={ [{ id: "view", label: "View", onClick }] }
        open={ true }
        onClose={ onClose }
      />
    );

    await userEvent.click(screen.getByRole("menuitem", { name: "View" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    document.body.removeChild(anchorEl);
  });

  it("does not close when closeOnSelect is false", async () => {
    const anchorEl = buildAnchor();
    const onClose = jest.fn();

    renderWithContext(
      <ActionMenu
        anchorEl={ anchorEl }
        closeOnSelect={ false }
        items={ [{ id: "view", label: "View", onClick: jest.fn() }] }
        open={ true }
        onClose={ onClose }
      />
    );

    await userEvent.click(screen.getByRole("menuitem", { name: "View" }));

    expect(onClose).not.toHaveBeenCalled();

    document.body.removeChild(anchorEl);
  });

  it("disables menu items and renders dividers by default", () => {
    const anchorEl = buildAnchor();

    renderWithContext(
      <ActionMenu
        anchorEl={ anchorEl }
        items={ [
          { id: "view", label: "View" },
          { disabled: true, id: "delete", label: "Delete" },
        ] }
        open={ true }
        onClose={ jest.fn() }
      />
    );

    const deleteItem = screen.getByRole("menuitem", { name: "Delete" });

    expect(deleteItem).toHaveAttribute("aria-disabled", "true");
    expect(screen.getAllByRole("separator")).toHaveLength(1);

    document.body.removeChild(anchorEl);
  });
});
