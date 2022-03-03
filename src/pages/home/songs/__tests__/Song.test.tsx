import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Song from "../Song";
const history = createMemoryHistory();

const mockPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe("<Song />", () => {
  const songId = 1;
  const name = "string";
  const album_image = "https://upload.wikimedia.org/wikipedia/en/0/0a/Kidcudimanonthemoonthelegendof.jpg";
  const song = <Song history={ history } songId={ songId } name={ name } albumImage={ album_image } />;

  it("renders the song content", () => {
    const { queryByRole } = render(song);

    expect(queryByRole("img")).toBeTruthy();
  });

  it("Hover Effect Works", async () => {
    render(song);
    fireEvent.mouseOver(screen.getByText(name));
    await waitFor(() => screen.findByText(name));
    expect(screen.getByText(name)).toBeDefined();
  });

  test("clicking the song calls history.push() with song ID", () => {
    const { getByRole, getByTestId } = render(song);

    const media = getByRole("img");
    fireEvent.click(media);
    expect(mockPush).toHaveBeenCalledWith("/home/song/1");
  });
});
