import { renderWithContext } from "common";
import OwnersTable from "../OwnersTable";
import { Owner, createData } from "../mockOwnersData";

const mockOwnersDataSmall: Owner[] = [
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Cody Fisher", "Life's away", 4, false),
  createData("Frank Ocean", "Ivy", 0.5, false),
];
const mockOwnersData: Owner[] = [
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Jane Cooper", "Once upon a time", 1, true),
];

const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};

describe("<OwnersTable>", () => {
  it("renders data correctly", () => {
    const { getByText } = renderWithContext(
      <OwnersTable ownersData={ mockOwnersDataSmall } />
    );

    expect(getByText("Jane Cooper")).toBeTruthy();
    expect(getByText("Cody Fisher")).toBeTruthy();
    expect(getByText("Frank Ocean")).toBeTruthy();
    expect(getByText("Once upon a time")).toBeTruthy();
    expect(getByText("Ivy")).toBeTruthy();
  });
  it("Should show correct number of rows per page depending on viewport height", () => {
    resizeWindow(1440, 550);

    const { getAllByText } = renderWithContext(
      <OwnersTable ownersData={ mockOwnersData } />
    );

    expect(getAllByText("Jane Cooper")).toHaveLength(2);
  });
  it("Should render 9 rows per page when viewport height is 950px", () => {
    resizeWindow(1440, 950);

    const { getAllByText } = renderWithContext(
      <OwnersTable ownersData={ mockOwnersData } />
    );

    expect(getAllByText("Jane Cooper")).toHaveLength(9);
  });
  it("Pagination component has correct number of pages", () => {
    resizeWindow(1440, 550);

    const { getByLabelText, queryByLabelText } = renderWithContext(
      <OwnersTable ownersData={ mockOwnersData } />
    );

    expect(getByLabelText("Go to page 5")).toBeTruthy();
    expect(queryByLabelText("Go to page 6")).toBeFalsy();
  });
});
