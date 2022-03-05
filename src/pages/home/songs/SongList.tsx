import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import { useAppSelector } from "common";
import { TableCell, TableCellImage, TableHeadCell, TableLine, TableRow } from "components";
import { selectSongs } from "modules/song";
import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";

const SongList: FunctionComponent = () => {
  const history = useHistory();

  const songs = useAppSelector(selectSongs);

  return (
    <TableContainer>
      <Table>
        <colgroup>
          <col style={ { width: "5%" } } />
        </colgroup>

        <TableHead>
          <MuiTableRow>
            <TableHeadCell />
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell>Genre</TableHeadCell>
            <TableHeadCell>Duration</TableHeadCell>
          </MuiTableRow>
          <TableLine columns={ 5 } />
        </TableHead>

        <TableBody>
          { Object.values(songs).map(({ id, name, userRole, genre, albumImage, duration }) => (
            <TableRow key={ id } onClick={ () => history.push(`/home/song/${id}`) }>
              <TableCell>
                <TableCellImage alt={ name } src={ albumImage } />
              </TableCell>
              <TableCell>{ name }</TableCell>
              <TableCell>{ userRole }</TableCell>
              <TableCell>{ genre }</TableCell>
              <TableCell sx={ { paddingLeft: "25px" } }>{ duration }m</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongList;
