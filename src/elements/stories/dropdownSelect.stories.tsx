import { Stack } from "@mui/material";
import DropdownSelect from "../DropdownSelect";

const options = [
  { id: 1, name: "Alternative", value: "Alternative" },
  { id: 2, name: "Anime", value: "Anime" },
  { id: 3, name: "Blues", value: "Blues" },
  { id: 4, name: "Children's", value: "Children" },
  { id: 5, name: "Classical", value: "Classical" },
  { id: 6, name: "Comedy", value: "Comedy" },
  { id: 7, name: "Lofi", value: "Lofi" },
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
