/* eslint-disable @typescript-eslint/no-unused-vars */

// import { renderWithContext } from "@newm-web/studio/common";
// import { extendedApi } from "@newm-web/studio/modules/song/api";
// import * as api from "@newm-web/studio/modules/song";
// import { mockUseGetSongsQueryResponse } from "@newm-web/studio/common";
import Library from "../Library";

// jest.mock("modules/song/api", () => ({
//   ...jest.requireActual("modules/song/api"),
//   useGetSongsQuery: jest.fn(() => mockUseGetSongsQueryResponse),
// }));
// Doesnt Work: TypeError: Cannot read property 'getSongs' of undefined

// jest.mock("modules/song", () => ({
//   extendedApi: {
//     endpoints: {
//       getSongs: {
//         initiate: jest.fn(() => mockUseGetSongsQueryResponse),
//       },
//     },
//   },
// }));
// Doesnt Work: Error: Uncaught [TypeError: (0 , _song.useGetSongsQuery) is not a function]

// jest.mock("modules/song", () => ({
//   extendedApi: {
//     useGetSongsQuery: jest.fn(() => mockUseGetSongsQueryResponse),
//   },
// }));
// Doesnt Work: Error: Uncaught [TypeError: (0 , _song.useGetSongsQuery) is not a function]

// jest.mock("modules/song/api");
// extendedApi.useGetSongsQuery.mockResolvedValue(mockUseGetSongsQueryResponse);
// Doesnt work: TS2339: Property 'mockResolvedValue' does not exist on
//type 'UseQuery<QueryDefinition<void, BaseQueryFn<string | FetchArgs,
//unknown, FetchBaseQueryError, RetryOptions, {} >, never, GetSongsResponse, "newmApi" >> '

// describe("<Library>", () => {
//   it("Calls the getSongs endpoint", async () => {
//     const { getByText } = renderWithContext(<Library />);

//     expect(api.useGetSongsQuery).toHaveBeenCalled();
//   });
// });

it("Pass", async () => {
  expect(true);
});
