import { renderWithContext } from "common";
import { fireEvent } from "@testing-library/react";
import Owners from "../Owners";

const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};

describe("<OwnersTable>", () => {
  const cases = ["Jane", "Cody", "Call me", "Life's aw"];
  it.each(cases)("Search box filteres owners correctly", (input: string) => {
    resizeWindow(1440, 550);

    const { getByRole, getAllByRole } = renderWithContext(<Owners />);

    const searchBox = getByRole("textbox");

    fireEvent.change(searchBox, { target: { value: input } });

    const cells = getAllByRole("row");

    // check that all rows contains the input string
    for (let i = 1; i < cells.length; i++) {
      const owner = cells[i].childNodes[0].textContent?.includes(input);
      const song = cells[i].childNodes[1].textContent?.includes(input);
      const inputExistsInFields = owner || song;
      expect(inputExistsInFields).toBeTruthy();
    }
  });
  it("Should show correct number of rows per page depending on viewport height", () => {
    resizeWindow(1440, 519);

    const { getAllByRole } = renderWithContext(<Owners />);

    expect(getAllByRole("row")).toHaveLength(4); // header row + 2 data rows + footer row
  });

  it("Pagination shows has correct number of pages", () => {
    resizeWindow(1440, 550);

    const { getByLabelText, getByText, queryByLabelText } = renderWithContext(
      <Owners />
    );

    const rowsPerPage = 3;
    const totalRows = Number(getByText(/Showing/i).textContent?.split(" ")[5]);
    const numberOfPages = Math.ceil(totalRows / rowsPerPage);

    expect(getByLabelText(`Go to page ${numberOfPages}`)).toBeTruthy();
    expect(queryByLabelText(`Go to page ${numberOfPages + 1}`)).toBeFalsy();
  });
  it("Should render 10 rows per page when viewport height is 950px", () => {
    resizeWindow(1440, 950);

    const { getAllByRole } = renderWithContext(<Owners />);

    expect(getAllByRole("row")).toHaveLength(12);
  });
});
