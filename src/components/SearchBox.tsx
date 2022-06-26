import { Box } from "@mui/material";
import { TextInput } from "elements";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import theme from "theme";

interface SearchBoxProps {
  query: string;
  requestSearch: (searched: string) => void;
  placeholder?: string;
}
export const SearchBox = ({
  query,
  requestSearch,
  placeholder = "",
}: SearchBoxProps) => {
  return (
    <Box sx={ { pb: 3, maxWidth: "340px" } }>
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
        placeholder={ placeholder }
      />
    </Box>
  );
};

export default SearchBox;
