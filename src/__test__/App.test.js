import { render, screen } from "@testing-library/react";
import App from "../App";

test("sample test", () => {
  render(<App />);

  expect(screen.getByText("Miah Jonez")).toBeDefined();
});
