import { Box } from "@mui/material";
import { TextInput } from "@newm.io/studio/elements";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import theme from "@newm.io/theme";

interface SearchBoxProps {
  query: string;
  onSearch: (searched: string) => void;
  placeholder?: string;
}
export const SearchBox = ({ query, onSearch, placeholder = "" }: SearchBoxProps) => {
  return (
    <Box sx={ { pb: 3, maxWidth: "340px" } }>
      <TextInput
        value={ query }
        isOptional={ false }
        onChange={ (e) => onSearch(e.target.value) }
        startAdornment={
          <SearchRoundedIcon
            fontSize="large"
            sx={ {
              color: theme.colors.grey100,
              paddingLeft: "8px",
            } }
          />
        }
        placeholder={ placeholder }
      />
    </Box>
  );
};

export default SearchBox;
