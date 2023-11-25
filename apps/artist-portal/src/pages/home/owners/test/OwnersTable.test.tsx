import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { useGetCollaboratorsQuery } from "@newm.io/studio/modules/song";
import OwnersTable from "../OwnersTable";

jest.mock("@newm.io/studio/modules/song", () => ({
  useGetCollaboratorsQuery: jest.fn(),
}));

describe("OwnersTable should", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const collaboratorsData = [
    {
      email: "john@example.com",
      songCount: 5,
      user: {
        firstName: "John",
        id: "123",
        lastName: "Doe",
        pictureUrl: "http://example.com/image.jpg",
      },
    },
    {
      email: "jane@example.com",
      songCount: 3,
      user: {
        firstName: "Jane",
        id: "456",
        lastName: "Doe",
        pictureUrl: "http://example.com/image.jpg",
      },
    },
  ];

  it("render table skeleton when loading", () => {
    (useGetCollaboratorsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<OwnersTable query="" totalCollaborators={ 10 } />);

    expect(screen.getByTestId("table-skeleton")).toBeInTheDocument();

    expect(screen.queryByText("No collaborators matched your search.")).not.toBeInTheDocument();
  });

  it("render no owners yet message when there are no collaborators and no query", () => {
    (useGetCollaboratorsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isSuccess: true,
      data: [],
    });

    render(
      <Router>
        <OwnersTable query="" totalCollaborators={ 0 } />
      </Router>
    );

    screen.debug;

    expect(screen.getByText("There are no collaborators yet.")).toBeInTheDocument();

    expect(screen.queryByTestId("table-skeleton")).not.toBeInTheDocument();
  });

  it("not render collaborators when there are no collaborators and query is provided", () => {
    (useGetCollaboratorsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isSuccess: true,
      data: [],
    });

    render(<OwnersTable query="example" totalCollaborators={ 0 } />);

    expect(screen.getByText("No collaborators matched your search.")).toBeInTheDocument();
    expect(screen.queryByTestId("table-skeleton")).not.toBeInTheDocument();
  });

  it("render collaborators table when data is available", () => {
    (useGetCollaboratorsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isSuccess: true,
      data: collaboratorsData,
    });

    render(<OwnersTable query="" totalCollaborators={ 2 } />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("5 songs")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("3 songs")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();

    expect(screen.getAllByAltText("Profile")).toHaveLength(2);
    expect(screen.queryByTestId("table-skeleton")).not.toBeInTheDocument();
  });
});
