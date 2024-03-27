import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { Box, Link, Stack } from "@mui/material";
import {
  isValueInArray,
  scrollToError,
  useWindowDimensions,
} from "@newm-web/utils";
import {
  Button,
  CopyrightInputField,
  DropdownSelectField,
  HorizontalLine,
  SwitchInputField,
  TextInputField,
} from "@newm-web/elements";
import theme from "@newm-web/theme";
import { useParams } from "react-router-dom";
import { MintingStatus } from "@newm-web/types";
import {
  UploadSongThunkRequest,
  emptySong,
  useGetEarliestReleaseDateQuery,
  useGetSongQuery,
} from "../../../modules/song";
import {
  MIN_DISTRIBUTION_TIME,
  NEWM_STUDIO_FAQ_URL,
  NONE_OPTION,
} from "../../../common";
import { emptyProfile, useGetProfileQuery } from "../../../modules/session";
import { CoverRemixSample } from "../../../components";
import { SongRouteParams } from "../library/types";

const AdvancedSongDetails = () => {
  const { data: { firstName } = emptyProfile } = useGetProfileQuery();
  const { songId } = useParams<"songId">() as SongRouteParams;
  const { data: song = emptySong } = useGetSongQuery(songId, { skip: !songId });

  const isDeclined = song.mintingStatus === MintingStatus.Declined;

  const windowWidth = useWindowDimensions()?.width;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isrcRef = useRef<any>(null);
  const publicationDateRef = useRef<HTMLInputElement | null>(null);
  const barcodeNumberRef = useRef<HTMLInputElement | null>(null);
  const releaseDateRef = useRef<HTMLInputElement | null>(null);
  const compositionCopyrightRef = useRef<HTMLDivElement | null>(null);
  const phonographicCopyrightRef = useRef<HTMLDivElement | null>(null);
  const ipiRef = useRef<HTMLInputElement | null>(null);
  const iswcRef = useRef<HTMLInputElement | null>(null);

  const { isSubmitting, setFieldValue, errors, values } =
    useFormikContext<UploadSongThunkRequest>();

  const { data: { date: earliestReleaseDate } = {} } =
    useGetEarliestReleaseDateQuery(undefined, {
      // endpoint throws error if user hasn't added first name
      skip: !firstName,
    });

  // Minimum date for schedule release date picker when no earliest release date
  const minDistributionDate = new Date(
    Date.now() + MIN_DISTRIBUTION_TIME * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    if (values.barcodeType === NONE_OPTION || values.barcodeType === "") {
      setFieldValue("barcodeNumber", "");
    }
  }, [setFieldValue, values.barcodeType]);

  useEffect(() => {
    if (isValueInArray("instrumental", values.genres)) {
      setFieldValue("isInstrumental", true);
    }
  }, [setFieldValue, values.genres]);

  useEffect(() => {
    scrollToError(errors, isSubmitting, [
      {
        element: releaseDateRef.current,
        error: errors.releaseDate,
      },
      {
        element: publicationDateRef.current,
        error: errors.publicationDate,
      },
      {
        element: compositionCopyrightRef.current,
        error: errors.compositionCopyrightYear,
      },
      {
        element: compositionCopyrightRef.current,
        error: errors.compositionCopyrightOwner,
      },
      {
        element: phonographicCopyrightRef.current,
        error: errors.phonographicCopyrightYear,
      },
      {
        element: phonographicCopyrightRef.current,
        error: errors.phonographicCopyrightOwner,
      },
      {
        element: isrcRef.current?.getInputDOMNode(),
        error: errors.isrc,
      },
      {
        element: barcodeNumberRef.current,
        error: errors.barcodeNumber,
      },
      {
        element: ipiRef.current,
        error: errors.ipi,
      },
      {
        element: iswcRef.current,
        error: errors.iswc,
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
        name="isInstrumental"
        title="Is this song an instrumental?"
        tooltipText={
          "Songs without voices or lyrics should be indicated as an " +
          "instrumental. Failure to accurately label the song will " +
          "result in a declined distribution submission."
        }
      />
      <SwitchInputField
        name="isExplicit"
        title="Does the song contain explicit content?"
        tooltipText={
          "Explicit content includes strong or discriminatory language, " +
          "or depictions of sex, violence or substance abuse."
        }
      />
      <CoverRemixSample />
      <Stack
        columnGap={ [undefined, undefined, 1.5] }
        display="grid"
        gridTemplateColumns={ ["repeat(1, 1fr)", null, "repeat(2, 1fr)"] }
        rowGap={ [2, null, 3] }
      >
        <TextInputField
          disabled={ isDeclined }
          isOptional={ false }
          label="SCHEDULE RELEASE DATE"
          min={ earliestReleaseDate ? earliestReleaseDate : minDistributionDate }
          name="releaseDate"
          placeholder="Select a day"
          ref={ releaseDateRef }
          tooltipText={
            "When selecting a date to release your song on our " +
            "platform, please remember to factor in approval from any " +
            "contributors/featured artists as well as mint processing time " +
            "which can take up to 15 days."
          }
          type="date"
        />
        <TextInputField
          label="ORIGINAL PUBLICATION DATE"
          max={ new Date().toISOString().split("T")[0] }
          name="publicationDate"
          placeholder="Select a day"
          ref={ publicationDateRef }
          tooltipText={
            "If your song has already been launched on other platforms you " +
            "may input the release date here, but it is not required."
          }
          type="date"
        />
        <CopyrightInputField
          copyrightType="composition"
          disabled={ isDeclined }
          label="COMPOSITION COPYRIGHT"
          ownerFieldName="compositionCopyrightOwner"
          ref={ compositionCopyrightRef }
          tooltipText={
            <span>
              The copyright for a musical composition covers the music and
              lyrics of a song (not the recorded performance). It is typically
              owned by the songwriter and/or music publisher. If you are not the
              copyright holder of the song composition, please review{ " " }
              <Link
                href={ NEWM_STUDIO_FAQ_URL }
                rel="noopener noreferrer"
                target="_blank"
              >
                copyright requirements
              </Link>{ " " }
              in our FAQ.
            </span>
          }
          yearFieldName="compositionCopyrightYear"
        />
        <CopyrightInputField
          copyrightType="phonographic"
          disabled={ isDeclined }
          label="SOUND RECORDING COPYRIGHT"
          ownerFieldName="phonographicCopyrightOwner"
          ref={ phonographicCopyrightRef }
          tooltipText={
            <span>
              The copyright in a sound recording covers the recording itself (it
              does not cover the music or lyrics of the song). It is typically
              owned by the artist and/or record label. If you are not the
              copyright holder of the sound recording, please review{ " " }
              <Link
                href={ NEWM_STUDIO_FAQ_URL }
                rel="noopener noreferrer"
                target="_blank"
              >
                copyright requirements
              </Link>{ " " }
              in our FAQ.
            </span>
          }
          yearFieldName="phonographicCopyrightYear"
        />
        <DropdownSelectField
          disabled={ isDeclined }
          label="RELEASE CODE TYPE"
          name="barcodeType"
          options={ [NONE_OPTION, "EAN", "UPC", "JAN"] }
          placeholder="Select one"
          tooltipText={
            "If you already have a release code, select the code type here " +
            "and enter the code in the next field. If not, leave this field " +
            "blank and an EAN release code will be auto-generated for you."
          }
        />
        <TextInputField
          disabled={
            values.barcodeType === NONE_OPTION ||
            !values.barcodeType ||
            isDeclined
          }
          label="RELEASE CODE NUMBER"
          name="barcodeNumber"
          placeholder="0000000000"
          ref={ barcodeNumberRef }
          tooltipText={
            "A release code number is a unique code that identifies your " +
            "release. If you do not already have one, leave this field blank, " +
            "and an EAN release code number will be auto-generated for you."
          }
        />
        <TextInputField
          disabled={ isDeclined }
          label="ISRC"
          mask="aa-***-99-99999"
          maskChar={ null }
          name="isrc"
          placeholder="AA-AAA-00-00000"
          ref={ isrcRef }
          tooltipText={
            "An ISRC is a unique code that identifies this specific " +
            "recording. If you do not already have one, leave this field " +
            "blank, and one will be generated for you."
          }
          onChange={ (event) =>
            setFieldValue("isrc", event.target.value.toUpperCase())
          }
        />
        <TextInputField
          label="IPI"
          name="ipi"
          placeholder="000000000"
          ref={ ipiRef }
          tooltipText={
            "An IPI is a nine-digit number used to identify songwriters, " +
            "composers, and music publishers; they are automatically assigned " +
            "to rights holders through membership to a PRO. This information is " +
            "optional; if you do not already have an IPI or choose not to obtain " +
            "one, leave this field blank."
          }
          type="number"
        />
        <TextInputField
          label="ISWC"
          mask="T-999999999-9"
          maskChar={ null }
          name="iswc"
          placeholder="T-000000000-0"
          ref={ iswcRef }
          tooltipText={
            "An ISWC is the unique identification code of your song " +
            "(unlike ISRC which is linked to  the specific recording). " +
            "This information is optional; if you do not already have an " +
            "ISWC or choose not to obtain one, whether this is an original " +
            "song or a cover, leave this field blank."
          }
        />
      </Stack>

      <Box>
        <HorizontalLine mb={ 5 } />

        <Button
          isLoading={ isSubmitting }
          type="submit"
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
