import { KeyboardEvent, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@newm-web/theme";
import { useWindowDimensions } from "@newm-web/utils";
import {
  TableCell,
  TableHeadCell,
  TablePagination,
  TableSkeleton,
} from "@newm-web/elements";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoOwnersYet from "./NoOwnersYet";
import { history } from "../../../common/history";
import { useGetCollaboratorsQuery } from "../../../modules/song";

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
    excludeMe: true,
    limit: collaboratorsToRequest,
    offset: (page - 1) * rowsPerPage,
    phrase: query,
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
      <Table aria-label="Song List" size="small">
        <TableHead>
          <TableRow>
            <TableHeadCell sx={ { display: { sm: "table-cell", xs: "none" } } }>
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
                sx={
                  id
                    ? {
                        "&:hover, &:focus": {
                          background: theme.colors.activeBackground,
                        },
                        WebkitTapHighlightColor: "transparent",
                        cursor: "pointer",
                      }
                    : undefined
                }
                tabIndex={ id ? 0 : undefined }
                onClick={ id ? () => handleNavigateToOwner(id) : undefined }
                onKeyDown={ id ? (event) => handleKeyDown(event, id) : undefined }
              >
                <TableCell sx={ { display: { sm: "table-cell", xs: "none" } } }>
                  <Stack
                    sx={ {
                      alignItems: "center",
                      columnGap: 1.5,
                      flexDirection: "row",
                      whiteSpace: "nowrap",
                    } }
                  >
                    { pictureUrl ? (
                      <img
                        alt="Profile"
                        src={ pictureUrl }
                        style={ {
                          borderRadius: "50%",
                          height: "40px",
                          width: "40px",
                        } }
                      />
                    ) : (
                      <Stack alignItems="center" direction="row" gap={ 1 }>
                        <AccountCircleIcon
                          sx={ {
                            color: theme.colors.grey200,
                            fontSize: "46px",
                            marginLeft: "-2px",
                          } }
                        />

                        <Typography fontStyle="italic" fontWeight={ 400 }>
                          Waiting on account creation
                        </Typography>
                      </Stack>
                    ) }
                    { firstName && lastName ? `${firstName} ${lastName}` : null }
                  </Stack>
                </TableCell>
                <TableCell>
                  <Box
                    sx={ {
                      alignItems: "center",
                      display: "flex",
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
            cellStyles={ { paddingTop: "12px" } }
            colSpan={ 3 }
            handlePageChange={ handlePageChange }
            lastRowOnPage={ lastRowOnPage }
            numberOfRows={ totalCollaborators }
            page={ page }
            rows="collaborators"
            rowsPerPage={ rowsPerPage }
          />
        ) }
      </Table>
    </TableContainer>
  ) : (
    <Typography>No collaborators matched your search.</Typography>
  );
}
