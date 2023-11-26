/**
 * Wrapper component used to provide the look of an text input without
 * actual text input functionality.
 */

import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '@newm.io/theme';

const PaperInput = styled(Paper)({
  alignItems: 'center',
  backgroundColor: theme.colors.grey500,
  borderWidth: theme.inputField.borderWidth,
  borderStyle: 'solid',
  borderColor: theme.colors.grey400,
  borderRadius: '9px',
  boxShadow: `inset 0px 3px 6px ${theme.colors.black}`,
  color: theme.colors.grey100,
  display: 'flex',
  justifyContent: 'center',
  minWidth: '100px',
  opacity: 1,
  textAlign: 'center',
});

export default PaperInput;
