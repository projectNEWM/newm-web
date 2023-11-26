import { Dialog as MuiDialog, styled } from '@mui/material';
import theme from 'newm-theme';

const Dialog = styled(MuiDialog)`
  & > .MuiBackdrop-root {
    background-color: ${theme.colors.backdropBlur};
  }

  & .MuiPaper-root {
    border-radius: 8px;
    background-color: ${theme.colors.black};
  }
`;

export default Dialog;
