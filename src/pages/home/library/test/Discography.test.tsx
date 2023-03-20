import { renderWithContext } from "common";
import { extendedApi } from "modules/song";
import Discography from "../Discography";

describe("<Discography>", () => {
  it("Calls useGetSongsQuery when it mounts", async () => {
    jest.spyOn(extendedApi, "useGetSongsQuery");

    renderWithContext(<Discography />);

    expect(extendedApi.useGetSongsQuery).toHaveBeenCalled();
  });
});
