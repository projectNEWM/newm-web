import { Box, IconButton, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import theme from "newm-theme";
import TextInput, { TextInput as UnwrappedTextInput } from "../TextInput";

export default {
  title: "Text Input",
  component: UnwrappedTextInput,
};

export const Variations = () => (
  <Box maxWidth={theme.inputField.maxWidth}>
    <Stack mt={2} direction="column" spacing={4}>
      <TextInput label="With label" placeholder="Hint" />

      <TextInput placeholder="Without label" />

      <TextInput
        placeholder="With icon"
        endAdornment={
          <IconButton sx={{ padding: 0, paddingRight: "1rem" }}>
            <VisibilityOutlinedIcon
              fontSize="small"
              sx={{ color: theme.colors.white }}
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
