import { Box, styled, MenuItem, SelectChangeEvent, Select } from "@mui/material";
import NEWMLogoSVG from "assets/images/NEWMLogo";
import { useState } from "react";

const TableDropdownSelect = () => {
  const StyledSelect = styled(Select)(({ theme }) => ({
    "& .css-x2bp66-MuiSvgIcon-root-MuiSelect-icon": {
      color: theme.colors.white,
      transform: "scale(1.2)",
      paddingBottom: "4px",
    },
    "& .c.css-zsouyz-MuiSvgIcon-root-MuiSelect-icon": {
      color: theme.colors.white,
      transform: "scale(1.2)",
      paddingBottom: "5px",
    },
    "& .MuiSelect-iconOpen": {
      color: theme.colors.white,
      transform: "rotate(180deg)",
    },
    "& .css-6t9ju4-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-6t9ju4-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-6t9ju4-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
      {},
    paddingRight: "5px",
  }));
  const StyledMenuItem = styled(MenuItem)({
    fontSize: 12,
  });
  const [dropdownValue, setDropdownValue] = useState("ROYALTIES PER WEEK");

  const handleDropdownChange = (event: SelectChangeEvent<unknown>) => {
    setDropdownValue(event.target.value as string);
  };
  return (
    <Box>
      <StyledSelect
        sx={ { fontSize: 12 } }
        color="info"
        variant="standard"
        value={ dropdownValue }
        onChange={ handleDropdownChange }
        size="small"
      >
        <StyledMenuItem value={ "ROYALTIES PER DAY" }>
          ROYALTIES PER DAY
        </StyledMenuItem>
        <StyledMenuItem value={ "ROYALTIES PER WEEK" }>
          ROYALTIES PER WEEK
        </StyledMenuItem>
        <StyledMenuItem value={ "ROYALTIES PER MONTH" }>
          ROYALTIES PER MONTH
        </StyledMenuItem>
        <StyledMenuItem value={ "ROYALTIES PER YEAR" }>
          ROYALTIES PER YEAR
        </StyledMenuItem>
      </StyledSelect>
    </Box>
  );
};

export default TableDropdownSelect;
