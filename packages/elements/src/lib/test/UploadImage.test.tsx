import { renderWithContext } from "./utils/render";
import mockFile from "./mocks/mockFile";
import UploadImage from "../UploadImage";

describe("<UploadImage>", () => {
  beforeEach(() => {
    global.URL.revokeObjectURL = jest.fn();
  });

  describe("when a file is present", () => {
    it("displays the filename", () => {
      const { queryByText } = renderWithContext(
        <UploadImage
          emptyMessage="Drag and drop or browse your image"
          file={ mockFile }
          onBlur={ jest.fn() }
          onChange={ jest.fn() }
          onError={ jest.fn() }
        />
      );

      expect(queryByText(mockFile.name)).toBeTruthy();
    });
  });

  describe("when a file is not present", () => {
    it("displays instructions to upload an image", () => {
      const { getByText } = renderWithContext(
        <UploadImage
          emptyMessage="Drag and drop or browse your image"
          onBlur={ jest.fn() }
          onChange={ jest.fn() }
          onError={ jest.fn() }
        />
      );

      const instructions = getByText("Drag and drop or browse your image");
      expect(instructions).toBeTruthy();
    });
  });
});
