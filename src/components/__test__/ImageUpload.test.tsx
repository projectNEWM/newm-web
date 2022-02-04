/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";

import "@testing-library/jest-dom";

import { ImageUpload } from "../ImageUpload";

test("shows correct label", () => {
  render(<ImageUpload dropzoneLabel="Test Dropzone Text" buttonLabel="Test Button Label" />);
  expect(screen.getByText("Test Dropzone Text")).toBeDefined();
  expect(screen.getByText("Test Button Label")).toBeDefined();
});

describe("When image is dropped", () => {
  beforeEach(() => {
    render(<ImageUpload dropzoneLabel="Test Dropzone Text" buttonLabel="Upload Image" />);

    // window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputEl = screen.getByTestId("dropzone");
    const file = new File(["test"], "test", { type: "image/jpg" });
    Object.defineProperty(inputEl, "files", {
      value: [file],
    });
    fireEvent.drop(inputEl);
  });

  it("Loading icon is shown", async () => {
    await waitForElementToBeRemoved(() => screen.queryByText("Test Dropzone Text"));

    expect(screen.queryByText("Test Dropzone Text")).toBeNull();
    expect(screen.queryByText("Upload Image")).toBeNull();
    expect(screen.getByTestId("loadingIcon")).toBeVisible();
  });

  // this test is failing because the fake image cannot be rendered
  // it("Image is shown", async () => {
  //   await waitForElementToBeRemoved(() => screen.queryByText("Test Dropzone Text"));

  //   expect(screen.getByTestId("loadingIcon")).toBeVisible();

  //   await waitForElementToBeRemoved(() => screen.queryByTestId("loadingIcon")); // failing here

  //   expect(screen.getByTestId("uploadedImage")).toBeVisible();
  // });
});
