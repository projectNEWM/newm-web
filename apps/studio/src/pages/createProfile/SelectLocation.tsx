import { FunctionComponent, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Button, DropdownSelectField } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { useWindowDimensions } from "@newm-web/utils";
import { useFormikContext } from "formik";
import { ResponsiveNEWMLogo } from "../../components";
import { ProfileFormValues } from "../../modules/session";
import { useGetCountriesQuery } from "../../modules/content";

const SelectLocation: FunctionComponent = () => {
  const windowWidth = useWindowDimensions()?.width;
  const { isValid, handleSubmit } = useFormikContext<ProfileFormValues>();
  const { data: locations = [] } = useGetCountriesQuery();

  /**
   * Add an event listener to submit the form when enter is pressed.
   * Without this Formik will only submit the form when enter is pressed
   * while an input is focused.
   */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Box mb={ 4 }>
        <ResponsiveNEWMLogo />
      </Box>
      <Typography
        id="location-prompt"
        sx={ { textAlign: "center" } }
        variant="h1"
      >
        Finally, what is your country of residence?
      </Typography>
      <Typography sx={ { mb: 6.5, textAlign: "center" } } variant="subtitle1">
        Providing this info will enable streaming platforms to make your music
        easier to find for your fans & listeners.
      </Typography>

      <DropdownSelectField
        aria-labelledby="location-prompt"
        name="location"
        options={ locations }
        placeholder="Select or search your country"
        widthType="default"
      />

      <Box sx={ { mt: [2, 2, 4], width: "100%" } }>
        <Box
          sx={ {
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            mt: 2,
            width: "100%",
          } }
        >
          <Stack
            sx={ {
              alignItems: "center",
              display: ["flex", "flex", "block"],
              flexDirection: ["column", "column", "row"],
              gap: 2,
              mb: 1,
              width: "100%",
            } }
          >
            <Button
              type="submit"
              width={
                windowWidth && windowWidth > theme.breakpoints.values.md
                  ? "compact"
                  : "default"
              }
            >
              Next
            </Button>
          </Stack>
          <Typography sx={ { opacity: isValid ? 1 : 0.5 } } variant="subtitle2">
            or press Enter
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectLocation;
