import { fireEvent, screen } from "@testing-library/react";

import { renderWithContext } from "./utils/render";
import { UnsavedChangesModal } from "../modals/UnsavedChangesModal";

const DEFAULT_MESSAGE =
  "You have unsaved changes. If you leave, your data will be lost.";

describe("<UnsavedChangesModal />", () => {
  const mockOnLeave = jest.fn();
  const mockOnStay = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when closed", () => {
    it("does not show modal content in the document", () => {
      renderWithContext(
        <UnsavedChangesModal
          isOpen={ false }
          onLeave={ mockOnLeave }
          onStay={ mockOnStay }
        />
      );

      expect(
        screen.queryByRole("button", { name: /keep editing/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /discard/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("when open", () => {
    it("renders the default message when message prop is not provided", () => {
      renderWithContext(
        <UnsavedChangesModal
          isOpen={ true }
          onLeave={ mockOnLeave }
          onStay={ mockOnStay }
        />
      );

      expect(screen.getByText(DEFAULT_MESSAGE)).toBeInTheDocument();
    });

    it("renders custom message when message prop is provided", () => {
      const customMessage = "Custom unsaved changes warning.";

      renderWithContext(
        <UnsavedChangesModal
          isOpen={ true }
          message={ customMessage }
          onLeave={ mockOnLeave }
          onStay={ mockOnStay }
        />
      );

      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it("renders title when title prop is provided", () => {
      const title = "Leave page?";

      renderWithContext(
        <UnsavedChangesModal
          isOpen={ true }
          title={ title }
          onLeave={ mockOnLeave }
          onStay={ mockOnStay }
        />
      );

      expect(screen.getByText(title)).toBeInTheDocument();
    });

    it("renders Stay and Leave buttons", () => {
      renderWithContext(
        <UnsavedChangesModal
          isOpen={ true }
          onLeave={ mockOnLeave }
          onStay={ mockOnStay }
        />
      );

      expect(
        screen.getByRole("button", { name: "Keep editing" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Discard" })
      ).toBeInTheDocument();
    });

    it("calls onStay when Stay button is clicked", () => {
      renderWithContext(
        <UnsavedChangesModal
          isOpen={ true }
          onLeave={ mockOnLeave }
          onStay={ mockOnStay }
        />
      );

      fireEvent.click(screen.getByRole("button", { name: "Keep editing" }));

      expect(mockOnStay).toHaveBeenCalledTimes(1);
      expect(mockOnLeave).not.toHaveBeenCalled();
    });

    it("calls onLeave when Leave button is clicked", () => {
      renderWithContext(
        <UnsavedChangesModal
          isOpen={ true }
          onLeave={ mockOnLeave }
          onStay={ mockOnStay }
        />
      );

      fireEvent.click(screen.getByRole("button", { name: "Discard" }));

      expect(mockOnLeave).toHaveBeenCalledTimes(1);
      expect(mockOnStay).not.toHaveBeenCalled();
    });
  });
});
