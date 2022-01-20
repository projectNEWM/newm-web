import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

test("shows artist profile data", () => {
  const name = "Miah Jonez";
  const roles = "Producer, Singer";
  const bio = "Artist bio";

  render(<Header artist={ { name, roles, bio } } />);

  expect(screen.getByText(name)).toBeDefined();
  expect(screen.getByText(roles)).toBeDefined();
  expect(screen.getByAltText(name)).toBeDefined();
});
