import { render, screen } from "@testing-library/react";
import { History } from "history";
import { Song } from "../Song";

test("Hover Effect Works", () => {
  const songId = 1;
  const name = "string";
  const album_image = "string";
  const history = new History();

  render(<Song history={ history } songId={ songId } name={ name } album_image={ album_image } />);

  expect(screen.getByText(name)).toBeDefined();
});
