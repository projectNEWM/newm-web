import { TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from 'newm-theme';

const HeaderCell = styled(TableCell)({
  borderBottom: `1px solid ${theme.colors.grey500}`,
  color: theme.colors.grey100,
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '17px',
  paddingBottom: '16px',
  paddingTop: '16px',
});

export default HeaderCell;
