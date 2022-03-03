import { fireEvent, render } from "@testing-library/react";
import { Role } from "modules/role";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { Provider } from "react-redux";
import store from "store";
import SongList from "../SongList";

const mockPush = jest.fn();
momentDurationFormatSetup(moment);
const mockMoment = moment;
const mockRole = Role;

/**
 *  Mocks
 */

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock("modules/song", () => ({
  selectSongs: () => ({
    1: {
      name: "Mr Rager",
      id: 1,
      genre: "Hip Hop",
      userRole: mockRole.Singer,
      releaseDate: new Date(2016, 5).toString(),
      description: "Kid Cudi's best",
      albumImage: "https://upload.wikimedia.org/wikipedia/en/0/0a/Kidcudimanonthemoonthelegendof.jpg",
      contributors: {
        1: { name: "John", role: mockRole.Producer, stake: 0.25 },
        2: { name: "Dan", role: mockRole.SoundEngineer, stake: 0.25 },
        3: { name: "Cudi", role: mockRole.Singer, stake: 0.5 },
      },
      duration: mockMoment.duration(60, "seconds").format(),
      extraInformation: "extra info",
    },
  }),
}));

const mockSongList = (
  <Provider store={ store }>
    <SongList />
  </Provider>
);

/**
 * Tests
 */

describe("<SongList />", () => {
  it("renders the song content", () => {
    const { queryByText } = render(mockSongList);

    expect(queryByText("Mr Rager")).toBeTruthy();
    expect(queryByText("Singer")).toBeTruthy();
    expect(queryByText("Hip Hop")).toBeTruthy();
    expect(queryByText("1:00m")).toBeTruthy();
  });

  test("clicking the song calls history.push() with song ID", () => {
    const { getByRole, getByText } = render(mockSongList);

    const media = getByRole("img");
    const title = getByText("Mr Rager");
    const count = getByText("1:00m");

    [media, title, count].forEach(element => {
      fireEvent.click(element);
      expect(mockPush).toHaveBeenCalledWith("/home/song/1");
    });
  });
});
