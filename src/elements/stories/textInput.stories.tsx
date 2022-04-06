import { Box, IconButton, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import theme from "theme";
import TextInput from "../TextInput";

export default {
  title: "Text Input",
  component: TextInput,
};

export const Variations = () => (
  <Box maxWidth="312px">
    <Stack mt={ 2 } direction="column" spacing={ 4 }>
      <TextInput label="With label" placeholder="Hint" />

      <TextInput placeholder="Without label" />

      <TextInput
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

      <TextInput placeholder="Disabled" disabled />

      <TextInput
        placeholder="With error"
        errorMessage="This is an error message"
      />
    </Stack>
  </Box>
);
