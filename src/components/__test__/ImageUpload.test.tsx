/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ImageUpload } from "../ImageUpload";

test("shows correct label", () => {
  render(createComponent());

  expect(screen.getByText("Test Dropzone Text")).toBeDefined();
  expect(screen.getByText("Upload Image")).toBeDefined();
});

describe("When image is dropped", () => {
  beforeEach(() => {
    // Mocking the upload to cloudinary
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.resolve({ json: () => ({ public_id: "test" }) })) as jest.Mock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Loading icon is shown", async () => {
    // arrange
    render(createComponent());
    const inputElement = createFileInputElement();

    // act
    fireEvent.drop(inputElement);

    // assert
    await waitForElementToBeRemoved(() => screen.queryByText("Upload Image"));
    expect(screen.queryByText("Test Dropzone Text")).toBeNull();
    expect(screen.queryByText("Upload Image")).toBeNull();
    expect(screen.getByTestId("loadingIcon")).toBeVisible();
  });

  it("uploads image", async () => {
    // arrange
    render(createComponent());
    const inputElement = createFileInputElement();

    // act
    fireEvent.drop(inputElement);
    await screen.findByTestId("loadingIcon");
    const imageElement = screen.getByTestId("uploadedImage");
    fireEvent.load(imageElement); // mocking cloudinary onLoad()

    // assert
    expect(screen.queryByTestId("loadingIcon")).toBeNull();
    expect(screen.queryByText("Upload Image")).toBeNull();
    expect(screen.queryByText("Test Dropzone Text")).toBeNull();
    expect(screen.getByTestId("uploadedImage")).toBeVisible();
  });
});

function createComponent() {
  return <ImageUpload dropzoneLabel="Test Dropzone Text" buttonLabel="Upload Image" />;
}

function createFileInputElement() {
  const inputEl = screen.getByTestId("drop-input");

  const file = createFile("file.png", 1234, "image/png");

  Object.defineProperty(inputEl, "files", {
    value: [file],
  });
  return inputEl;
}

function createFile(name: string, size: number, type: string) {
  const file = new File([], name, { type });
  Object.defineProperty(file, "size", {
    get() {
      return size;
    },
  });
  return file;
}
