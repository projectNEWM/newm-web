import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import { useState } from 'react';

const TableDropdownSelect = () => {
  const StyledSelect = styled(Select)(({ theme }) => ({
    '& .css-x2bp66-MuiSvgIcon-root-MuiSelect-icon': {
      color: theme.colors.white,
      transform: 'scale(1.2)',
      paddingBottom: 4,
    },
    '& .c.css-zsouyz-MuiSvgIcon-root-MuiSelect-icon': {
      color: theme.colors.white,
      transform: 'scale(1.2)',
      paddingBottom: '5px',
    },
    '& .MuiSelect-iconOpen': {
      color: theme.colors.white,
      transform: 'rotate(180deg)',
    },
  }));
  const StyledMenuItem = styled(MenuItem)({
    fontSize: 12,
  });
  const [dropdownValue, setDropdownValue] = useState('ROYALTIES PER WEEK');

  const handleDropdownChange = (event: SelectChangeEvent<unknown>) => {
    setDropdownValue(event.target.value as string);
  };
  return (
    <Box>
      <StyledSelect
        sx={{ fontSize: 12 }}
        color="info"
        variant="standard"
        value={dropdownValue}
        onChange={handleDropdownChange}
        size="small"
      >
        <StyledMenuItem value={'ROYALTIES PER DAY'}>
          ROYALTIES PER DAY
        </StyledMenuItem>
        <StyledMenuItem value={'ROYALTIES PER WEEK'}>
          ROYALTIES PER WEEK
        </StyledMenuItem>
        <StyledMenuItem value={'ROYALTIES PER MONTH'}>
          ROYALTIES PER MONTH
        </StyledMenuItem>
        <StyledMenuItem value={'ROYALTIES PER YEAR'}>
          ROYALTIES PER YEAR
        </StyledMenuItem>
      </StyledSelect>
    </Box>
  );
};

export default TableDropdownSelect;
