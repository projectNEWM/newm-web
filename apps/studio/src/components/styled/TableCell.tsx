import { TableCell as MUITableCell } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '@newm.io/theme';

const TableCell = styled(MUITableCell)({
  paddingTop: '10px',
  paddingBottom: '10px',
  borderTop: `1px solid ${theme.colors.grey500}`,
  borderBottom: `1px solid ${theme.colors.grey500}`,

  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  color: theme.colors.white,
});

export default TableCell;
