import { renderWithContext } from "common";
import { Song } from "modules/song";
import { useState } from "react";
import SongList from "../SongList";

const mockData: Song[] = [
  {
    coverArtUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
    createdAt: "2022-06-12T18:40:00.465598",
    credits: "Produced by Max Martin and Oscar Holter",
    description: "Test description",
    genre: "Rock",
    id: "2d78237a-33ad-4ec1-b0ff-5fca2940a129",
    ownerId: "29557f40-8866-4215-a739-1b2c853aa672",
    title: "Say It Ain't So",
  },
];

const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};

describe("<SongList>", () => {
  it("renders data correctly", () => {
    const [page, setPage] = useState(1);
    const { getByText } = renderWithContext(
      <SongList songData={ mockData } page={ page } setPage={ setPage } />
    );

    expect(getByText("Jane Cooper")).toBeTruthy();
    expect(getByText("Cody Fisher")).toBeTruthy();
    expect(getByText("Frank Ocean")).toBeTruthy();
    expect(getByText("Once upon a time")).toBeTruthy();
    expect(getByText("Ivy")).toBeTruthy();
  });

  // it("Should show correct number of rows per page depending on viewport height", () => {
  //   resizeWindow(1440, 550);

  //   const { getAllByText } = renderWithContext(
  //     <OwnersTable ownersData={ mockOwnersData } />
  //   );

  //   expect(getAllByText("Jane Cooper")).toHaveLength(2);
  // });
  // it("Should render 9 rows per page when viewport height is 950px", () => {
  //   resizeWindow(1440, 950);

  //   const { getAllByText } = renderWithContext(
  //     <OwnersTable ownersData={ mockOwnersData } />
  //   );

  //   expect(getAllByText("Jane Cooper")).toHaveLength(9);
  // });
  // it("Pagination component has correct number of pages", () => {
  //   resizeWindow(1440, 550);

  //   const { getByLabelText, queryByLabelText } = renderWithContext(
  //     <OwnersTable ownersData={ mockOwnersData } />
  //   );

  //   expect(getByLabelText("Go to page 5")).toBeTruthy();
  //   expect(queryByLabelText("Go to page 6")).toBeFalsy();
  // });
});
