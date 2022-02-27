import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Song from "../Song";
const history = createMemoryHistory();

describe("<Song />", () => {
  test("Hover Effect Works", async () => {
    const songId = 1;
    const name = "string";
    const album_image =
      "https://upload.wikimedia.org/wikipedia/en/0/0a/Kidcudimanonthemoonthelegendof.jpg";
    const song = (
      <Song
        history={ history }
        songId={ songId }
        name={ name }
        albumImage={ album_image }
      />
    );

    render(song);
    fireEvent.mouseOver(screen.getByText(name));
    await waitFor(() => screen.findByText(name));
    expect(screen.getByText(name)).toBeDefined();
  });
});
