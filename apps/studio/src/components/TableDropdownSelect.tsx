import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { FunctionComponent } from "react";
import { PortfolioTableFilter } from "../common";

export interface TableDropdownMenuParameters {
  readonly label: string;
  readonly value: string;
}

interface TableDropdownSelectProps {
  readonly menuItems: ReadonlyArray<TableDropdownMenuParameters>;
  readonly onDropdownChange?: (value: PortfolioTableFilter) => void;
  readonly selectedValue: string;
}

const TableDropdownSelect: FunctionComponent<TableDropdownSelectProps> = ({
  selectedValue,
  menuItems,
  onDropdownChange,
}) => {
  const StyledSelect = styled(Select)(({ theme }) => ({
    "& .MuiSelect-icon": {
      color: theme.colors.white,
    },
    fontSize: "12px",
  }));

  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    "&.Mui-selected": {
      backgroundColor: theme.colors.activeBackground,
    },
    "&.MuiMenuItem-root:hover": {
      backgroundColor: theme.colors.activeBackground,
    },
    fontSize: "12px",
  }));

  const handleDropdownChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value as PortfolioTableFilter;

    if (Object.values(PortfolioTableFilter).includes(selectedValue)) {
      onDropdownChange?.(selectedValue);
    } else {
      // eslint-disable-next-line no-console
      console.warn("Unexpected value for PortfolioTableFilter:", selectedValue);
    }
  };

  return (
    <Box>
      <StyledSelect
        color="info"
        size="small"
        value={ selectedValue }
        variant="standard"
        onChange={ handleDropdownChange }
      >
        { menuItems.map((menuItem) => (
          <StyledMenuItem key={ menuItem.value } value={ menuItem.value }>
            { menuItem.label.toUpperCase() }
          </StyledMenuItem>
        )) }
      </StyledSelect>
    </Box>
  );
};

export default TableDropdownSelect;
