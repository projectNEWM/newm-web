/* eslint-disable jest/no-commented-out-tests */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "App";

describe("Artist bio", () => {
  it("is shown when content is not scrolled down", () => {
    //arrange
    render(<App />);
    const artistBio = screen.getByTestId("artistBio");

    //act

    // assert
    expect(artistBio).toBeDefined();
  });

  // The following two tests use fireEvent.scroll()
  // This scroll user event only works in "real" browser environments
  // In order for these tests to pass we will need to use something like Puppeteer
  // see https://github.com/testing-library/react-testing-library/issues/671).

  //   it("is hidden on scroll down", async () => {
  //     //arrange
  //     render(<App />);
  //     const contentBox = screen.getByTestId("contentBox");

  //     //act
  //     await fireEvent.scroll(contentBox, { target: { scrollY: 100 } });
  //     contentBox.scroll({
  //       top: 100,
  //     });
  //     fireEvent.scroll(contentBox);
  //     fireEvent.scroll(contentBox, { scrollY: 70 });
  //     await waitForElementToBeRemoved(() => screen.queryByTestId("artistBio"));

  //     // assert
  //     expect(screen.queryByTestId("artistBio")).not.toBeVisible();
  //   });

  //   test("Artist Bio is shown on scroll up", async () => {
  //     //arrange
  //     render(<App />);
  //     const contentBox = screen.getByTestId("contentBox");

  //     //act
  //     fireEvent.scroll(contentBox, { scrollY: 70 });
  //     fireEvent.scroll(contentBox, { scrollY: -70 });

  //     // assert
  //     expect(screen.getByTestId("artistBio")).toBeVisible();
  //   });
});
