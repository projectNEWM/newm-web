import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { FunctionComponent } from "react";

export interface TableDropdownMenuParameters {
  readonly label: string;
  readonly value: string;
}

interface TableDropdownSelectProps {
  readonly menuItems: ReadonlyArray<TableDropdownMenuParameters>;
  readonly onChange?: (value: string) => void;
  readonly selectedValue: string;
}

const TableDropdownSelect: FunctionComponent<TableDropdownSelectProps> = ({
  selectedValue,
  menuItems,
  onChange,
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
    onChange?.(event.target.value as string);
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
