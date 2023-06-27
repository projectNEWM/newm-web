import { ChangeEvent, useState } from "react";
import { useFormikContext } from "formik";
import { Box, Stack } from "@mui/material";
import { formatIsrc, useWindowDimensions } from "common";
import {
  DropdownMultiSelectField,
  SwitchInputField,
  TextInputField,
} from "components";
import { Button, DatePickerInput, HorizontalLine } from "elements";
import { UploadSongRequest } from "modules/song";
import theme from "theme";

const AdvancedSongDetails = () => {
  const windowWidth = useWindowDimensions()?.width;

  const [isrcValue, setIsrcValue] = useState("");

  const { isSubmitting, setFieldValue } = useFormikContext<UploadSongRequest>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatIsrc(event.target.value);

    setIsrcValue(formattedValue);
    setFieldValue("isrc", formattedValue);
  };

  return (
    <Stack
      marginX={ ["auto", "auto", "unset"] }
      maxWidth={ ["340px", "340px", "700px"] }
      spacing={ 3 }
    >
      <SwitchInputField
        name="parentalAdvisory"
        title="Does the song contain explicit content?"
        tooltipText={
          "Explicit content includes strong or discriminatory language, " +
          "or depictions of sex, violence or substance abuse."
        }
      />
      <Stack
        display="grid"
        gridTemplateColumns={ ["repeat(1, 1fr)", null, "repeat(2, 1fr)"] }
        rowGap={ [2, null, 3] }
        columnGap={ [undefined, undefined, 1.5] }
      >
        <DatePickerInput
          name="scheduledDate"
          label="SCHEDULE RELEASE DATE"
          options={ [] }
          isOptional={ false }
          placeholder="Select a day"
          tooltipText={
            "When selecting a date to release your song on our " +
            "platform, please remember to factor in approval form any " +
            "contributors/featured artists as well as mint processing time " +
            "which can take up to 15 days."
          }
        />
        <DatePickerInput
          name="releaseDate"
          label="ORIGINAL RELEASE DATE"
          options={ [] }
          placeholder="Select a day"
          tooltipText={
            "If your song has already been launched on other platforms you " +
            "may input the release date here, but it is not required."
          }
        />
        <TextInputField
          isOptional={ false }
          name="copyrights"
          label="COPYRIGHT"
          placeholder="Copyright holder"
          tooltipText={
            "If your song has already been launched on other platforms you " +
            "may input the release date here, but it is not required."
          }
        />
        <TextInputField
          isOptional={ false }
          name="isrc"
          label="ISRC"
          placeholder="AA-AAA-00-00000"
          tooltipText={ " " }
          value={ isrcValue }
          onChange={ handleChange }
        />
        <DropdownMultiSelectField
          isOptional={ false }
          name="barcodeType"
          label="ID TYPE"
          tooltipText={ " " }
          placeholder="Select one"
          options={ [] }
        />
        <TextInputField
          name="barcodeNumber"
          label="ID NUMBER"
          placeholder="0000000000"
          tooltipText={ " " }
        />
        <TextInputField
          name="ipis"
          label="IPI"
          placeholder="000000000"
          tooltipText={ " " }
        />
        <TextInputField
          name="iswc"
          label="ISWC"
          placeholder="T 000000000 0"
          tooltipText={ " " }
        />
      </Stack>

      <Box>
        <HorizontalLine mb={ 5 } />

        <Button
          type="submit"
          isLoading={ isSubmitting }
          width={
            windowWidth && windowWidth > theme.breakpoints.values.md
              ? "compact"
              : "default"
          }
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
};

export default AdvancedSongDetails;
