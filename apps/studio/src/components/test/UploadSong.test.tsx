import { mockFile, renderWithContext } from "@newm.io/studio/common";
import UploadSong from "../UploadSong";

jest.mock("@newm.io/studio/common", () => ({
  ...jest.requireActual("@newm.io/studio/common"),
  getFileBinary: jest.fn(),
}));

describe("<UploadSong>", () => {
  describe("when a file is present", () => {
    it("displays the filename", () => {
      const { getByText } = renderWithContext(
        <UploadSong
          file={mockFile}
          onBlur={jest.fn()}
          onChange={jest.fn()}
          onError={jest.fn()}
        />
      );

      expect(getByText(mockFile.name)).toBeTruthy();
    });
  });

  describe("when a file is not present", () => {
    it("displays instructions to upload a song", () => {
      const { getByText } = renderWithContext(
        <UploadSong
          onBlur={jest.fn()}
          onChange={jest.fn()}
          onError={jest.fn()}
        />
      );

      const instructions = getByText("Drag and drop or browse your song");
      expect(instructions).toBeTruthy();
    });
  });
});
