import { TableHead as MUITableHead, TableRow } from '@mui/material';
import { TableHeadCell } from '@newm.io/studio/components';

const TableHead = () => {
  return (
    <MUITableHead>
      <TableRow>
        <TableHeadCell>SONG NAME</TableHeadCell>
        <TableHeadCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
          MINTING
        </TableHeadCell>
        <TableHeadCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
          GENRE
        </TableHeadCell>
        <TableHeadCell
          sx={{
            textAlign: 'end',
            display: { xs: 'none', md: 'table-cell' },
          }}
        >
          LENGTH
        </TableHeadCell>
      </TableRow>
    </MUITableHead>
  );
};

export default TableHead;
