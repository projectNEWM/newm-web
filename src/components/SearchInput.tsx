import { Box } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { TextInput, Typography } from "elements";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import theme from "theme";

interface SearchInputProps {
  setPaginationPage?: Dispatch<SetStateAction<number>>;
  data: any[];
  filter: (arg0:any)=>any[];
  placeholderText: string;
}

const SearchInput = ({
  setPaginationPage,
  data,
  filter,
  placeholderText,
}: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<typeof data[]>();

  const requestSearch = (searched: string) => {
    setQuery(searched);
    setPaginationPage && setPaginationPage(1);

    if (searched == "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(filter));
    }
  };

  return (
    <Box sx={ { pb: 3, width: "340px" } }>
      <TextInput
        value={ query }
        onChange={ (e) => requestSearch(e.target.value) }
        startAdornment={
          <SearchRoundedIcon
            fontSize="large"
            sx={ {
              color: theme.palette.text.secondary,
              paddingLeft: "8px",
            } }
          />
        }
        placeholderText={ placeholder }
      />
    </Box>
  );
};

export default SearchInput;
