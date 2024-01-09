import { Stack } from "@mui/material";
import DropdownSelect from "../DropdownSelect";

const options = [
  "Alternative",
  "Anime",
  "Blues",
  "Children's",
  "Classical",
  "Comedy",
  "Lofi",
];

export default {
  component: DropdownSelect,
  title: "Dropdown Select",
};

export const Variations = () => (
  <Stack direction="row" mt={ 2 } spacing={ 4 }>
    <DropdownSelect label="With label" name="withLabel" options={ options } />

    <DropdownSelect
      label="Disabled"
      name="disabled"
      options={ options }
      placeholder="Disabled"
      disabled
    />

    <DropdownSelect
      errorMessage="This is an error message"
      label="With error"
      name="withError"
      options={ options }
    />

    <DropdownSelect label="No options" name="noOptions" options={ [] } />
  </Stack>
);
