import { IconButton, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import theme from "theme";
import TextField from "../TextField";

export default {
  title: "Text Input",
  component: TextField,
};

export const Variations = () => (
  <Stack mt={ 2 } direction="column" spacing={ 4 }>
    <TextField label="With label" placeholder="Hint" />

    <TextField placeholder="Without label" />

    <TextField
      placeholder="With icon"
      endAdornment={
        <IconButton sx={ { padding: 0, paddingLeft: "1rem" } }>
          <VisibilityOutlinedIcon
            fontSize="small"
            sx={ { color: theme.colors.white } }
          />
        </IconButton>
      }
    />

    <TextField placeholder="Disabled" disabled />

    <TextField
      placeholder="With error"
      errorMessage="This is an error message"
    />
  </Stack>
);
