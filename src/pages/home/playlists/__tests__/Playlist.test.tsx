import Playlist from "../Playlist";
import { render, fireEvent } from "@testing-library/react";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe("<Playlist />", () => {
  const playlist = (
    <Playlist
      id={ 4 }
      title="Example title"
      songCount={ 12 }
      imageUrl="https://www.example.com/image.png"
    />
  );

  it("renders the playlist content", () => {
    const { queryByText } = render(playlist);

    expect(queryByText("Example title")).toBeTruthy();
    expect(queryByText("12 songs")).toBeTruthy();
  });

  test("clicking the playlist calls history.push() with playlist ID", () => {
    const { getByRole, getByText } = render(playlist);

    const media = getByRole("img");
    const title = getByText("Example title");
    const count = getByText("12 songs");

    [media, title, count].forEach((element) => {
      fireEvent.click(element);
      expect(mockPush).toHaveBeenCalledWith("/home/playlist/4")
    })
  });
})
