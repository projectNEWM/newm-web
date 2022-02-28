import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import { useAppSelector } from "common";
import {
  TableCell,
  TableCellImage,
  TableHeadCell,
  TableLine,
  TableRow,
} from "components";
import { selectPlaylists } from "modules/playlist";
import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";

const PlaylistList: FunctionComponent = () => {
  const history = useHistory();

  const playlists = useAppSelector(selectPlaylists);

  return (
    <TableContainer>
      <Table>
        <colgroup>
          <col style={ { width: "15%" } } />
        </colgroup>

        <TableHead>
          <MuiTableRow>
            <TableHeadCell />
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Songs</TableHeadCell>
          </MuiTableRow>

          <TableLine columns={ 3 } />
        </TableHead>

        <TableBody>
          { Object.values(playlists).map(({
            id,
            name,
            songIds,
            coverImageUrl,
          }) => (
            <TableRow
              key={ id }
              onClick={ () => history.push(`/home/playlist/${id}`) }
            >
              <TableCell>
                <TableCellImage alt={ name } src={ coverImageUrl } />
              </TableCell>
              <TableCell>
                { name }
              </TableCell>
              <TableCell>
                { songIds.length } songs
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlaylistList;
