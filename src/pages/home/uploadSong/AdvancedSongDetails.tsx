import { Stack } from "@mui/material";
import { useWindowDimensions } from "common";
import {
  DropdownMultiSelectField,
  SwitchInputField,
  TextInputField,
} from "components";
import { Button, DatePickerInput } from "elements";
import { useFormikContext } from "formik";
import { UploadSongRequest } from "modules/song";
import theme from "theme";

const AdvancedSongDetails: React.FC = () => {
  const windowWidth = useWindowDimensions()?.width;

  const { values, errors, touched, setFieldValue, isSubmitting } =
    useFormikContext<UploadSongRequest>();

  return (
    <Stack>
      <Stack
        sx={ {
          marginY: 5,
          marginX: ["auto", "auto", "unset"],
          maxWidth: ["340px", "340px", "700px"],
        } }
      >
        <SwitchInputField
          name="isExplicit"
          title="DOES THE SONG CONTAIN EXPLICIT CONTENT?"
          description={
            "Explicit content includes strong or discriminatory language, " +
            "or depictions of sex, violence or substance abuse."
          }
        />
        <Stack
          sx={ {
            display: "grid",
            gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
            rowGap: ["16px", null, "12px"],
            columnGap: [undefined, undefined, "20px"],
          } }
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
            name="originalDate"
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
            name="copyright"
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
          />
          <DropdownMultiSelectField
            isOptional={ false }
            name="idType"
            label="ID TYPE"
            placeholder="Select one"
            options={ [] }
          />
          <TextInputField
            name="idNumber"
            label="ID NUMBER"
            placeholder="0000000000"
            tooltipText={ " " }
          />
          <TextInputField
            name="ipi"
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

        <Button
          sx={ { mt: 5 } }
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
      </Stack>
    </Stack>
  );
};

export default AdvancedSongDetails;
