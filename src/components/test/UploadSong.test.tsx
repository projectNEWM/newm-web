import { mockFile, renderWithContext } from "common";
import UploadSong from "../UploadSong";

describe("<UploadSong>", () => {
  describe("when a file is present", () => {
    it("displays the filename", () => {
      const { queryByText } = renderWithContext(
        <UploadSong
          file={ mockFile }
          onChange={ jest.fn() }
          onBlur={ jest.fn() }
          onError={ jest.fn() }
        />
      );

      expect(queryByText(mockFile.name)).toBeTruthy();
    });
  });

  describe("when a file is not present", () => {
    it("displays instructions to upload a song", () => {
      const { getByText } = renderWithContext(
        <UploadSong
          onChange={ jest.fn() }
          onBlur={ jest.fn() }
          onError={ jest.fn() }
        />
      );

      const instructions = getByText("Drag and drop or browse your song");
      expect(instructions).toBeTruthy();
    });
  });
});
