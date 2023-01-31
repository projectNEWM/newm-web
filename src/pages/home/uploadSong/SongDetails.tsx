import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Button, HorizontalLine, Typography } from "elements";
import { Box, Stack } from "@mui/material";
import { selectContent } from "modules/content";
import { selectSong } from "modules/song";
import {
  DropdownSelectField,
  TextAreaField,
  TextInputField,
  UploadImageField,
  UploadSongField,
} from "components";
import { useWindowDimensions } from "common";
import theme from "theme";
import MintSong from "./MintSong";

const SongDetails: FunctionComponent = () => {
  const { genres } = useSelector(selectContent);
  const { isLoading } = useSelector(selectSong);
  const windowWidth = useWindowDimensions()?.width;

  return (
    <Stack direction="column">
      <Stack
        sx={ {
          display: "grid",
          gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
          columnGap: [undefined, undefined, "20px"],
          maxWidth: [undefined, undefined, "700px"],
          rowGap: ["16px", null, "12px"],
        } }
      >
        <Stack spacing={ 0.5 }>
          <Typography color="grey100" fontWeight={ 500 }>
            MUSIC
          </Typography>

          <UploadSongField name="audio" />
        </Stack>

        <Stack spacing={ 0.5 }>
          <Typography color="grey100" fontWeight={ 500 }>
            SONG COVER ART
          </Typography>

          <UploadImageField name="image" />
        </Stack>
      </Stack>

      <Stack
        sx={ {
          marginY: 5,
          marginX: ["auto", "auto", "unset"],
          maxWidth: ["340px", "340px", "700px"],
        } }
      >
        <HorizontalLine />
      </Stack>

      <Stack
        sx={ {
          display: "grid",
          gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
          rowGap: ["16px", null, "12px"],
          columnGap: [undefined, undefined, "20px"],
          maxWidth: [undefined, undefined, "700px"],
        } }
      >
        <TextInputField name="title" label="SONG TITLE" />

        <DropdownSelectField name="genre" label="GENRE" options={ genres } />
      </Stack>

      <Stack
        sx={ {
          marginTop: 2.5,
          marginX: ["auto", "auto", "unset"],
          maxWidth: ["340px", "340px", "700px"],
        } }
      >
        <TextAreaField
          name="description"
          label="SONG DESCRIPTION"
          placeholder="Optional"
        />

        <Box mt={ 5 }>
          <HorizontalLine />
        </Box>

        <Box mt={ 5 }>
          <MintSong />
        </Box>

        <Box mt={ 5 }>
          <HorizontalLine />
        </Box>

        <Button
          sx={ { mt: 5 } }
          type="submit"
          isLoading={ isLoading }
          width={
            windowWidth && windowWidth > theme.breakpoints.values.md
              ? "compact"
              : "default"
          }
        >
          Upload
        </Button>
      </Stack>
    </Stack>
  );
};

export default SongDetails;
