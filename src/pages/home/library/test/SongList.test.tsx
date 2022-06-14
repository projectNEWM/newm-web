import { renderWithContext } from "common";
import { extendedApi } from "modules/song";
import * as api from "modules/song";
import { mockUseGetSongsQueryResponse } from "./mockUseGetSongsQueryResponse";
import Library from "../Library";

const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};

// () => ({
//   ...jest.requireActual("modules/song"),
//   useGetSongsQuery: jest.fn(() => mockUseGetSongsQueryResponse),
// }));


// jest.mock("modules/song", () => ({
//   extendedApi: {
//     endpoints: {
//       getSongs: {
//         initiate: jest.fn(() => mockUseGetSongsQueryResponse),
//       },
//     },
//   },
// }));

jest.mock("modules/song");

describe("<Library>", () => {
  it("Calls the getSongs endpoint", async () => {
    api.useGetSongsQuery.mockResolvedValue(mockUseGetSongsQueryResponse);

    const { getByText } = renderWithContext(<Library />);

    expect(api).toHaveBeenCalled();
  });
});
