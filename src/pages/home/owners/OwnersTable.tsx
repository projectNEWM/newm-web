import { KeyboardEvent, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "theme";
import { useGetCollaboratorsQuery } from "modules/song";
import { Typography } from "elements";
import { useWindowDimensions } from "common";
import {
  TableCell,
  TableHeadCell,
  TablePagination,
  TableSkeleton,
} from "components";
import { history } from "common/history";
import NoOwnersYet from "./NoOwnersYet";

interface OwnersTableProps {
  query: string;
  totalCollaborators: number;
}

export default function OwnersTable({
  query,
  totalCollaborators,
}: OwnersTableProps) {
  const headerHeight = 245;
  const footerHeight = 40;
  const bottomPadding = 30;
  const rowHeight = 65;
  const viewportWidth = useWindowDimensions()?.width;
  const viewportHeight = useWindowDimensions()?.height;
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [page, setPage] = useState(1);

  let collaboratorsToRequest = rowsPerPage;

  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;
  const totalPagesCount = Math.ceil(totalCollaborators / rowsPerPage);
  const remainingSongsOnLastPage = totalCollaborators % rowsPerPage;

  // Determines how many collaborators to request for the last page
  if (page === totalPagesCount) {
    collaboratorsToRequest =
      remainingSongsOnLastPage > 0 ? remainingSongsOnLastPage : rowsPerPage;
  }

  const {
    data: collaboratorsData = [],
    isLoading,
    isSuccess,
  } = useGetCollaboratorsQuery({
    offset: (page - 1) * rowsPerPage,
    limit: collaboratorsToRequest,
    phrase: query,
    excludeMe: true,
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const handleNavigateToOwner = (id: string) => {
    history.push(`/home/collaborators/${id}`);
  };

  const handleKeyDown = (event: KeyboardEvent, id: string) => {
    if (event.key === "Enter") {
      handleNavigateToOwner(id);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  // sets the # of rows per page depending on viewport height
  useEffect(() => {
    if (viewportHeight) {
      const rowsWithCurrentHeight = Math.abs(
        Math.floor(
          (viewportHeight - headerHeight - footerHeight - bottomPadding) /
            rowHeight
        )
      );

      setRowsPerPage(rowsWithCurrentHeight ? rowsWithCurrentHeight : 1);
      setPage(1);
    }
  }, [viewportHeight]);

  if (isLoading) {
    return (
      <TableSkeleton
        cols={
          viewportWidth && viewportWidth > theme.breakpoints.values.sm ? 3 : 2
        }
      />
    );
  }

  if (isSuccess && collaboratorsData?.length === 0 && !query) {
    return <NoOwnersYet />;
  }

  return collaboratorsData?.length ? (
    <TableContainer>
      <Table size="small" aria-label="Song List">
        <TableHead>
          <TableRow>
            <TableHeadCell sx={ { display: { xs: "none", sm: "table-cell" } } }>
              COLLABORATORS
            </TableHeadCell>
            <TableHeadCell>OWNER OF</TableHeadCell>
            <TableHeadCell sx={ { textAlign: "end" } }>EMAIL</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { collaboratorsData.map(
            (
              {
                email,
                songCount,
                user: {
                  firstName = "",
                  id = "",
                  lastName = "",
                  pictureUrl = "",
                } = {},
              },
              index
            ) => (
              <TableRow
                key={ id || index }
                onClick={ id ? () => handleNavigateToOwner(id) : undefined }
                onKeyDown={ id ? (event) => handleKeyDown(event, id) : undefined }
                tabIndex={ id ? 0 : undefined }
                sx={
                  id
                    ? {
                        cursor: "pointer",
                        WebkitTapHighlightColor: "transparent",
                        "&:hover, &:focus": {
                          background: theme.colors.activeBackground,
                        },
                      }
                    : undefined
                }
              >
                <TableCell sx={ { display: { xs: "none", sm: "table-cell" } } }>
                  <Stack
                    sx={ {
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 1.5,
                      whiteSpace: "nowrap",
                    } }
                  >
                    { pictureUrl ? (
                      <img
                        style={ {
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                        } }
                        src={ pictureUrl }
                        alt="Profile"
                      />
                    ) : (
                      <Stack sx={ { height: "40px", width: "40px" } }></Stack>
                    ) }
                    { firstName && lastName ? `${firstName} ${lastName}` : null }
                  </Stack>
                </TableCell>
                <TableCell>
                  <Box
                    sx={ {
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    } }
                  >
                    { `${songCount} song${songCount > 1 ? "s" : ""}` }
                  </Box>
                </TableCell>
                <TableCell
                  sx={ {
                    textAlign: "end",
                    whiteSpace: "nowrap",
                  } }
                >
                  { email }
                </TableCell>
              </TableRow>
            )
          ) }
        </TableBody>
        { totalCollaborators > collaboratorsData.length && (
          <TablePagination
            numberOfRows={ totalCollaborators }
            page={ page }
            rowsPerPage={ rowsPerPage }
            lastRowOnPage={ lastRowOnPage }
            handlePageChange={ handlePageChange }
            colSpan={ 3 }
            rows="collaborators"
            cellStyles={ { paddingTop: "12px" } }
          />
        ) }
      </Table>
    </TableContainer>
  ) : (
    <Typography>No collaborators matched your search.</Typography>
  );
}
