import { FunctionComponent } from "react";
import { useAppSelector } from "common";
import { TableCell, TableHeadCell, TableLine, TableRow } from "components";
import { selectPlaylists } from "modules/playlist";
import { useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import MuiTableRow from "@mui/material/TableRow";

const PlaylistList: FunctionComponent = () => {
  const playlists = useAppSelector(selectPlaylists);

  return (
    <TableContainer>
      <Table>
        <col style={ { width: "15%" } } />

        <TableHead>
          <MuiTableRow>
            <TableHeadCell />
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Songs</TableHeadCell>
          </MuiTableRow>

          <TableLine columns={ 3 } style={ { marginBottom: "16px" } } />
        </TableHead>

        <TableBody>
          {Object.values(playlists).map(({
            id,
            name,
            songIds,
            coverImageUrl,
          }) => (
            <>
              <TableRow key={ id }>
                <TableCell>
                  <img
                    alt={name}
                    src={coverImageUrl}
                    style={ {
                      display: "flex",
                      width: "44px",
                      height: "44px",
                      margin: "10px",
                      borderRadius: "50%",
                    } }
                  />
                </TableCell>
                <TableCell>
                  { name }
                </TableCell>
                <TableCell>
                  { songIds.length } songs
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default PlaylistList;
