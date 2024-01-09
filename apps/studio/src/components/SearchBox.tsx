import { Box } from "@mui/material";
import { TextInput } from "@newm-web/elements";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import theme from "@newm-web/theme";

interface SearchBoxProps {
  onSearch: (searched: string) => void;
  placeholder?: string;
  query: string;
}
export const SearchBox = ({
  query,
  onSearch,
  placeholder = "",
}: SearchBoxProps) => {
  return (
    <Box sx={ { maxWidth: "340px", pb: 3 } }>
      <TextInput
        isOptional={ false }
        placeholder={ placeholder }
        startAdornment={
          <SearchRoundedIcon
            fontSize="large"
            sx={ {
              color: theme.colors.grey100,
              paddingLeft: "8px",
            } }
          />
        }
        value={ query }
        onChange={ (e) => onSearch(e.target.value) }
      />
    </Box>
  );
};

export default SearchBox;
