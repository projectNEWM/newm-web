import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import {
  useGetCollaboratorsQuery,
  useGetSongCountQuery,
} from "../../../../modules/song";
import OwnersTable from "../OwnersTable";
import "@testing-library/jest-dom";

jest.mock("../../../../modules/song", () => ({
  useGetCollaboratorsQuery: jest.fn(),
  useGetSongCountQuery: jest.fn(),
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
    (useGetSongCountQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<OwnersTable query="" totalCollaborators={ 10 } />);

    expect(screen.getByTestId("table-skeleton")).toBeInTheDocument();

    expect(
      screen.queryByText("No collaborators matched your search.")
    ).not.toBeInTheDocument();
  });

  describe("when there are no collaborators and no query is provided", () => {
    beforeEach(() => {
      (useGetCollaboratorsQuery as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
        isSuccess: true,
      });
    });

    it("render no owners yet message", () => {
      (useGetSongCountQuery as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
      });

      render(
        <Router>
          <OwnersTable query="" totalCollaborators={ 0 } />
        </Router>
      );

      expect(
        screen.getByText("There are no collaborators yet.")
      ).toBeInTheDocument();

      expect(screen.queryByTestId("table-skeleton")).not.toBeInTheDocument();
    });

    it("render `Upload your first song` on navigation button when no songs have been uploaded", () => {
      (useGetSongCountQuery as jest.Mock).mockReturnValue({
        data: { count: 0 },
        isLoading: false,
      });

      render(
        <Router>
          <OwnersTable query="" totalCollaborators={ 0 } />
        </Router>
      );

      expect(screen.queryAllByRole("button")[0]).toHaveTextContent(
        "Upload your first song"
      );
    });

    it("render 'Invite other collaborators' on navigation button when there are songs uploaded", () => {
      (useGetSongCountQuery as jest.Mock).mockReturnValue({
        data: { count: 1 },
        isLoading: false,
      });

      render(
        <Router>
          <OwnersTable query="" totalCollaborators={ 0 } />
        </Router>
      );

      expect(screen.queryAllByRole("button")[0]).toHaveTextContent(
        "Invite other collaborators"
      );
    });
  });

  it("not render collaborators when there are no collaborators and query is provided", () => {
    (useGetCollaboratorsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isSuccess: true,
    });

    (useGetSongCountQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<OwnersTable query="example" totalCollaborators={ 0 } />);

    expect(
      screen.getByText("No collaborators matched your search.")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("table-skeleton")).not.toBeInTheDocument();
  });

  it("render collaborators table when data is available", () => {
    (useGetCollaboratorsQuery as jest.Mock).mockReturnValue({
      data: collaboratorsData,
      isLoading: false,
      isSuccess: true,
    });

    (useGetSongCountQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
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
