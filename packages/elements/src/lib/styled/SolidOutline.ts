import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import theme from 'newm-theme';

const SolidOutline = styled(Box)`
  border-radius: 4px;
  border: 2px solid ${theme.colors.grey400};
`;

export default SolidOutline;
