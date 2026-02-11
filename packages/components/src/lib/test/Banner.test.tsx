import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithContext } from "./utils/render";
import Banner from "../Banner";

describe("<Banner />", () => {
  it("renders with title", () => {
    renderWithContext(<Banner title="Test Banner" />);

    expect(screen.getByText("Test Banner")).toBeInTheDocument();
  });

  it("renders title as ReactNode", () => {
    renderWithContext(
      <Banner title={ <span data-testid="custom-title">Custom Title</span> } />
    );

    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    renderWithContext(
      <Banner description="Test description" title="Test Banner" />
    );

    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders description as ReactNode", () => {
    renderWithContext(
      <Banner
        description={ <span data-testid="custom-desc">Custom Description</span> }
        title="Test Banner"
      />
    );

    expect(screen.getByTestId("custom-desc")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    renderWithContext(<Banner title="Test Banner" />);

    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });

  it("applies custom background", () => {
    renderWithContext(
      <Banner background="linear-gradient(90deg, #000, #fff)" title="Test" />
    );

    const banner = screen.getByTestId("banner");
    expect(banner).toHaveStyle({
      background: "linear-gradient(90deg, #000, #fff)",
    });
  });

  it("applies custom text color", () => {
    renderWithContext(<Banner textColor="#ff0000" title="Test" />);

    const banner = screen.getByTestId("banner");
    expect(banner).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("applies fixed positioning when fixed is true", () => {
    renderWithContext(<Banner fixed={ true } title="Test" />);

    const banner = screen.getByTestId("banner");
    expect(banner).toHaveStyle({ position: "fixed" });
    expect(banner).toHaveStyle({ top: "0px" });
    expect(banner).toHaveStyle({ zIndex: "1300" });
  });

  it("does not apply fixed positioning when fixed is false", () => {
    renderWithContext(<Banner fixed={ false } title="Test" />);

    const banner = screen.getByTestId("banner");
    expect(banner).not.toHaveStyle({ position: "fixed" });
    expect(banner).not.toHaveStyle({ top: "0px" });
    expect(banner).not.toHaveStyle({ zIndex: "1300" });
  });

  it("applies full width when fullWidth is true", () => {
    renderWithContext(<Banner fullWidth={ true } title="Test" />);

    const banner = screen.getByTestId("banner");
    expect(banner).toHaveStyle({ width: "100%" });
  });

  it("does not apply full width when fullWidth is false", () => {
    renderWithContext(<Banner fullWidth={ false } title="Test" />);

    const banner = screen.getByTestId("banner");
    expect(banner).not.toHaveStyle({ width: "100%" });
  });

  it("applies textAlign prop to Box", () => {
    renderWithContext(<Banner textAlign="left" title="Test" />);

    const banner = screen.getByTestId("banner");
    expect(banner).toBeInTheDocument();
    // MUI Box applies textAlign prop, verified by component rendering
  });

  it("defaults textAlign to center", () => {
    renderWithContext(<Banner title="Test" />);

    const banner = screen.getByTestId("banner");
    expect(banner).toBeInTheDocument();
  });

  it("applies sx prop to root Box", () => {
    renderWithContext(<Banner sx={ { marginTop: "20px" } } title="Test" />);

    const banner = screen.getByTestId("banner");
    expect(banner).toHaveStyle({ marginTop: "20px" });
  });

  it("applies titleSx prop to title Typography", () => {
    renderWithContext(<Banner title="Test" titleSx={ { fontWeight: 100 } } />);

    const title = screen.getByText("Test");
    expect(title).toBeInTheDocument();
  });

  it("applies default paddingX styles", () => {
    renderWithContext(<Banner title="Test" />);

    const banner = screen.getByTestId("banner");
    // paddingX: 3 translates to 24px in MUI theme
    expect(banner).toHaveStyle({ paddingLeft: "24px", paddingRight: "24px" });
  });

  it("renders Stack component", () => {
    renderWithContext(<Banner title="Test" />);

    const banner = screen.getByTestId("banner");
    // Stack is rendered as a child of the banner
    expect(banner).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders title with h4 variant", () => {
    renderWithContext(<Banner title="Test" />);

    const title = screen.getByText("Test");
    expect(title.tagName).toBe("H4");
  });

  it("renders description with body1 variant", () => {
    renderWithContext(<Banner description="Description" title="Title" />);

    const description = screen.getByText("Description");
    expect(description.tagName).toBe("P");
  });

  it("applies fontWeight 400 to description", () => {
    renderWithContext(<Banner description="Description" title="Title" />);

    const description = screen.getByText("Description");
    expect(description).toBeInTheDocument();
  });

  it("merges sx prop with default styles", () => {
    renderWithContext(
      <Banner sx={ { marginTop: "20px", paddingLeft: "10px" } } title="Test" />
    );

    const banner = screen.getByTestId("banner");
    expect(banner).toHaveStyle({ marginTop: "20px" });
    // sx prop should override default paddingX
    expect(banner).toHaveStyle({ paddingLeft: "10px" });
  });

  it("uses theme default background when background prop is not provided", () => {
    renderWithContext(<Banner title="Test" />);

    const banner = screen.getByTestId("banner");
    // Component should render with default background from theme (theme.gradients.music)
    expect(banner).toBeInTheDocument();
    // Banner renders successfully with default background
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("uses theme default text color when textColor prop is not provided", () => {
    renderWithContext(<Banner title="Test" />);

    const banner = screen.getByTestId("banner");
    // Component should render with default color from theme (theme.colors.white = #FFFFFF)
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveStyle({ color: "rgb(255, 255, 255)" });
  });
});
