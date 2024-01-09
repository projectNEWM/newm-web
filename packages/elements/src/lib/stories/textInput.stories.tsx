import { Box, IconButton, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import theme from "@newm-web/theme";
import TextInput, { TextInput as UnwrappedTextInput } from "../TextInput";

export default {
  component: UnwrappedTextInput,
  title: "Text Input",
};

export const Variations = () => (
  <Box maxWidth={ theme.inputField.maxWidth }>
    <Stack direction="column" mt={ 2 } spacing={ 4 }>
      <TextInput label="With label" placeholder="Hint" />

      <TextInput placeholder="Without label" />

      <TextInput
        endAdornment={
          <IconButton sx={ { padding: 0, paddingRight: "1rem" } }>
            <VisibilityOutlinedIcon
              fontSize="small"
              sx={ { color: theme.colors.white } }
            />
          </IconButton>
        }
        placeholder="With icon"
      />

      <TextInput placeholder="Disabled" disabled />

      <TextInput
        errorMessage="This is an error message"
        placeholder="With error"
      />
    </Stack>
  </Box>
);
