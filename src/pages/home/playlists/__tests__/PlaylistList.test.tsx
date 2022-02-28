import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "store";
import PlaylistList from "../PlaylistList";

const mockPush = jest.fn();

/**
 *  Mocks
 */

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock("modules/playlist", () => ({
  selectPlaylists: () => ({
    "T3ST1D": {
      id: "T3ST1D",
      name: "Wicked Melowdees",
      coverImageUrl: "https://www.example.jpg",
      songIds: [
        "39F63442-DC66-4AED-8280-6FB618082DFE",
        "AF453F0F-93B2-4230-89E2-5FABFC4BE73B",
        "D0222091-7707-4C6E-BB62-AA73684EB80F",
      ],
    },
  }),
}));

const mockPlaylistList = (
  <Provider store={store}>
    <PlaylistList />
  </Provider>
)

/**
 * Tests
 */

describe("<PlaylistList />", () => {
  it("renders the playlist content", () => {
    const { queryByText } = render(mockPlaylistList);

    expect(queryByText("Wicked Melowdees")).toBeTruthy();
    expect(queryByText("3 songs")).toBeTruthy();
  });

  test("clicking the playlist calls history.push() with playlist ID", () => {
    const { getByRole, getByText } = render(mockPlaylistList);

    const media = getByRole("img");
    const title = getByText("Wicked Melowdees");
    const count = getByText("3 songs");

    [media, title, count].forEach((element) => {
      fireEvent.click(element);
      expect(mockPush).toHaveBeenCalledWith("/home/playlist/T3ST1D")
    })
  });
})
