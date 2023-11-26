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
  title: "Dropdown Select",
  component: DropdownSelect,
};

export const Variations = () => (
  <Stack mt={ 2 } direction="row" spacing={ 4 }>
    <DropdownSelect label="With label" name="withLabel" options={ options } />

    <DropdownSelect
      label="Disabled"
      name="disabled"
      placeholder="Disabled"
      disabled
      options={ options }
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
