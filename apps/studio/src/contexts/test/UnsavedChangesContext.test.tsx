import { fireEvent, screen } from "@testing-library/react";

import { renderWithContext } from "../../common";
import {
  UnsavedChangesProvider,
  useUnsavedChanges,
} from "../UnsavedChangesContext";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const UNSAVED_MESSAGE =
  "You have unsaved changes. If you leave, your data will be lost.";

describe("useUnsavedChanges", () => {
  it("throws when used outside UnsavedChangesProvider", () => {
    const Consumer = () => {
      useUnsavedChanges();
      return null;
    };

    expect(() => renderWithContext(<Consumer />)).toThrow(
      "useUnsavedChanges must be used within an UnsavedChangesProvider"
    );
  });
});

describe("<UnsavedChangesProvider />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children", () => {
    const Child = () => <span data-testid="child">Child</span>;

    renderWithContext(
      <UnsavedChangesProvider>
        <Child />
      </UnsavedChangesProvider>
    );

    expect(screen.getByTestId("child")).toHaveTextContent("Child");
  });

  it("opens modal when requestNavigation is called", () => {
    const Consumer = () => {
      const { requestNavigation } = useUnsavedChanges();
      return (
        <button
          type="button"
          onClick={ () => requestNavigation("/home/releases") }
        >
          Request nav
        </button>
      );
    };

    renderWithContext(
      <UnsavedChangesProvider>
        <Consumer />
      </UnsavedChangesProvider>
    );

    expect(
      screen.queryByRole("button", { name: /stay/i })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /request nav/i }));

    expect(screen.getByText(UNSAVED_MESSAGE)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Stay" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Leave" })).toBeInTheDocument();
  });

  it("calls navigate with path when Leave is clicked after requestNavigation(path)", () => {
    const Consumer = () => {
      const { requestNavigation } = useUnsavedChanges();
      return (
        <button
          type="button"
          onClick={ () => requestNavigation("/home/profile") }
        >
          Go to profile
        </button>
      );
    };

    renderWithContext(
      <UnsavedChangesProvider>
        <Consumer />
      </UnsavedChangesProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /go to profile/i }));
    fireEvent.click(screen.getByRole("button", { name: "Leave" }));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/home/profile");
  });

  it("calls navigate(-1) when Leave is clicked after requestNavigation(null)", () => {
    const Consumer = () => {
      const { requestNavigation } = useUnsavedChanges();
      return (
        <button type="button" onClick={ () => requestNavigation(null) }>
          Go back
        </button>
      );
    };

    renderWithContext(
      <UnsavedChangesProvider>
        <Consumer />
      </UnsavedChangesProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /go back/i }));
    fireEvent.click(screen.getByRole("button", { name: "Leave" }));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("closes modal and does not call navigate when Stay is clicked", () => {
    const Consumer = () => {
      const { requestNavigation } = useUnsavedChanges();
      return (
        <button type="button" onClick={ () => requestNavigation("/home/wallet") }>
          Go to wallet
        </button>
      );
    };

    renderWithContext(
      <UnsavedChangesProvider>
        <Consumer />
      </UnsavedChangesProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /go to wallet/i }));
    fireEvent.click(screen.getByRole("button", { name: "Stay" }));

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(
      screen.queryByRole("button", { name: "Leave" })
    ).not.toBeInTheDocument();
  });

  it("provides setHasUnsavedChanges and hasUnsavedChanges to consumers", () => {
    const Consumer = () => {
      const { hasUnsavedChanges, setHasUnsavedChanges } = useUnsavedChanges();
      return (
        <div>
          <span data-testid="dirty">{ String(hasUnsavedChanges) }</span>
          <button type="button" onClick={ () => setHasUnsavedChanges(true) }>
            Set dirty
          </button>
        </div>
      );
    };

    renderWithContext(
      <UnsavedChangesProvider>
        <Consumer />
      </UnsavedChangesProvider>
    );

    expect(screen.getByTestId("dirty")).toHaveTextContent("false");

    fireEvent.click(screen.getByRole("button", { name: /set dirty/i }));

    expect(screen.getByTestId("dirty")).toHaveTextContent("true");
  });
});
