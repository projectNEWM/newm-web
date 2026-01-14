import { render } from "@testing-library/react";
import GradientDashedOutline from "../styled/GradientDashedOutline";

const getEmotionClassName = (className: string): string | undefined =>
  className
    .split(" ")
    .map((c) => c.trim())
    .find((c) => c.startsWith("css-"));

describe("<GradientDashedOutline>", () => {
  it("renders children", () => {
    const { getByText } = render(
      <GradientDashedOutline>Child</GradientDashedOutline>
    );

    expect(getByText("Child")).toBeInTheDocument();
  });

  it("does not forward the `gradient` prop to the DOM", () => {
    const { getByTestId } = render(
      <GradientDashedOutline data-testid="outline" gradient="music">
        Child
      </GradientDashedOutline>
    );

    expect(getByTestId("outline")).not.toHaveAttribute("gradient");
  });

  it("updates its generated class when gradient changes", () => {
    const { getByTestId, rerender } = render(
      <GradientDashedOutline data-testid="outline">Child</GradientDashedOutline>
    );

    const first = getByTestId("outline");
    const firstEmotionClass = getEmotionClassName(first.className);
    expect(firstEmotionClass).toBeTruthy();

    rerender(
      <GradientDashedOutline data-testid="outline" gradient="music">
        Child
      </GradientDashedOutline>
    );

    const second = getByTestId("outline");
    const secondEmotionClass = getEmotionClassName(second.className);
    expect(secondEmotionClass).toBeTruthy();

    expect(secondEmotionClass).not.toEqual(firstEmotionClass);
  });
});
