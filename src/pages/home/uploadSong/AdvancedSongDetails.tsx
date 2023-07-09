import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { Box, Stack } from "@mui/material";
import { NONE_OPTION, scrollToError, useWindowDimensions } from "common";
import {
  DropdownSelectField,
  SwitchInputField,
  TextInputField,
} from "components";
import { Button, DatePickerInput, HorizontalLine } from "elements";
import { UploadSongRequest } from "modules/song";
import { emptyProfile, useGetProfileQuery } from "modules/session";
import theme from "theme";

const AdvancedSongDetails = () => {
  const windowWidth = useWindowDimensions()?.width;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isrcRef = useRef<any>(null);

  const { data: { companyName = "", firstName = "" } = emptyProfile } =
    useGetProfileQuery();

  const { isSubmitting, setFieldValue, errors, values } =
    useFormikContext<UploadSongRequest>();

  useEffect(() => {
    scrollToError(errors, isSubmitting, [
      {
        error: errors.isrc,
        element: isrcRef.current?.getInputDOMNode(),
      },
    ]);
  }, [errors, isSubmitting, isrcRef]);

  return (
    <Stack
      marginX={ ["auto", "auto", "unset"] }
      maxWidth={ ["340px", "340px", "700px"] }
      spacing={ 3 }
    >
      <SwitchInputField
        name="isExplicit"
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
          isOptional={ false }
          name="releaseDate"
          label="SCHEDULE RELEASE DATE"
          placeholder="Select a day"
          tooltipText={
            "When selecting a date to release your song on our " +
            "platform, please remember to factor in approval form any " +
            "contributors/featured artists as well as mint processing time " +
            "which can take up to 15 days."
          }
        />
        <DatePickerInput
          name="originalDate"
          label="ORIGINAL RELEASE DATE"
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
          placeholder={ `ex. © ${new Date().getFullYear()} ${
            companyName ? companyName : firstName
          }` }
          tooltipText={ "" }
        />
        <TextInputField
          isOptional={ values.isrc ? false : true }
          label="ISRC"
          mask="aa-***-99-99999"
          maskChar={ null }
          name="isrc"
          placeholder="AA-AAA-00-00000"
          ref={ isrcRef }
          tooltipText={ " " }
          onChange={ (event) =>
            setFieldValue("isrc", event.target.value.toUpperCase())
          }
        />
        <DropdownSelectField
          name="barcodeType"
          label="BARCODE TYPE"
          tooltipText={ " " }
          placeholder="Select one"
          options={ [NONE_OPTION, "UPC", "EAN", "JAN"] }
        />
        <TextInputField
          isOptional={
            !!values.barcodeType && values.barcodeType !== NONE_OPTION
              ? false
              : true
          }
          name="barcodeNumber"
          label="BARCODE NUMBER"
          placeholder="0000000000"
          tooltipText={ " " }
        />
        <TextInputField
          name="userIpi"
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
