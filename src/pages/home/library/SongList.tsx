import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "theme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Typography } from "elements";
import { useWindowDimensions } from "common";
import VerticalEllipsis from "assets/images/VerticalEllipsis";
import PlayButton from "assets/images/PlayButton";
import { Song } from "modules/song";
import { TablePagination } from "components";

interface SongListProps {
  songData: Song[] | null | undefined;
  rowHeight?: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
const StyledTableCell = styled(TableCell)({
  borderColor: theme.colors.grey700,
  paddingTop: "4px",
  paddingBottom: "4px",
  paddingLeft: "0px",
});

export default function SongList({
  songData,
  rowHeight = 65,
  page,
  setPage,
}: SongListProps) {
  const headerHeight = 245;
  const footerHeight = 40;
  const bottomPadding = 30;
  const [rowsPerPage, setRowsPerPage] = useState(0);
  // Used to avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = songData
    ? page > 1
      ? Math.max(0, page * rowsPerPage - songData.length)
      : 0
    : 0;
  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;

  // determines how many rows to display per page
  const windowHeight = useWindowDimensions()?.height;

  // sets the # of rows per page depending on viewport height
  useEffect(() => {
    setRowsPerPage(
      windowHeight
        ? Math.floor(
            (windowHeight - headerHeight - footerHeight - bottomPadding) /
              rowHeight
          )
        : 5
    );
  }, [windowHeight, rowHeight]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const getResizedAlbumCoverImageUrl = (url: string | undefined) => {
    if (!url) {
      return "";
    } else if (url.split("/")[2] == "res.cloudinary.com") {
      return url.replace("upload/", "upload/w_56,h_56,c_fill,q_auto,f_auto/");
    } else {
      return url;
    }
  };

  if (songData) {
    return (
      <TableContainer
        sx={ {
          paddingRight: { xs: 0, md: 5.5 },
        } }
      >
        <Table size="small" aria-label="Song List">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography fontWeight={ 700 } color="grey100">
                  SONG
                </Typography>
              </StyledTableCell>
              <StyledTableCell sx={ { display: { xs: "none", sm: "block" } } }>
                <Typography fontWeight={ 700 } color="grey100">
                  GENRE
                </Typography>
              </StyledTableCell>
              <StyledTableCell sx={ { paddingRight: 8 } } align="right">
                <Typography
                  fontWeight={ 700 }
                  color="grey100"
                  sx={ { display: { xs: "none", sm: "block" } } }
                >
                  CREATED ON
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { songData
              .slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage
              )
              .map((row) => (
                <TableRow key={ row.id }>
                  <StyledTableCell>
                    <Box sx={ { display: "flex", alignItems: "center" } }>
                      <IconButton sx={ { paddingRight: 4, paddingLeft: 0 } }>
                        <PlayButton />
                      </IconButton>
                      <img
                        style={ {
                          borderRadius: "4px",
                          width: "56px",
                          height: "56px",
                        } }
                        src={ getResizedAlbumCoverImageUrl(row.coverArtUrl) }
                        alt="Album cover"
                      />
                      <Box
                        sx={ {
                          paddingLeft: "12px",
                          overflow: "scroll",
                          whiteSpace: "nowrap",
                          maxWidth: { xs: "148px", sm: "auto" },
                        } }
                      >
                        { row.title }
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ { display: { xs: "none", sm: "table-cell" } } }
                  >
                    { row.genre }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Box sx={ { display: { xs: "none", sm: "inline" } } }>
                      { row.createdAt.slice(0, 10) }{ " " }
                    </Box>
                    <IconButton>
                      <VerticalEllipsis />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              )) }
            { emptyRows > 0 && (
              <TableRow style={ { height: rowHeight * emptyRows } }>
                <StyledTableCell colSpan={ 3 } />
              </TableRow>
            ) }
          </TableBody>
          { songData.length > rowsPerPage ? (
            <TablePagination
              numberOfRows={ songData.length }
              page={ page }
              rowsPerPage={ rowsPerPage }
              lastRowOnPage={ lastRowOnPage }
              handlePageChange={ handlePageChange }
              colSpan={ 3 }
              rows="songs"
              cellStyles={ { paddingTop: "12px" } }
            />
          ) : (
            ""
          ) }
        </Table>
      </TableContainer>
    );
  } else {
    return <div></div>;
  }
}
