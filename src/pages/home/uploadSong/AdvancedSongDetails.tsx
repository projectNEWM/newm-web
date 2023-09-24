import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { Box, Link, Stack } from "@mui/material";
import {
  MIN_DISTRIBUTION_TIME,
  NEWM_STUDIO_FAQ_URL,
  NONE_OPTION,
  scrollToError,
  useWindowDimensions,
} from "common";
import {
  CopyrightInputField,
  DropdownSelectField,
  SwitchInputField,
  TextInputField,
} from "components";
import { Button, HorizontalLine } from "elements";
import {
  UploadSongRequest,
  useGetEarliestReleaseDateQuery,
} from "modules/song";
import theme from "theme";
import { emptyProfile, useGetProfileQuery } from "modules/session";

const AdvancedSongDetails = () => {
  const { data: { firstName } = emptyProfile } = useGetProfileQuery();

  const windowWidth = useWindowDimensions()?.width;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isrcRef = useRef<any>(null);
  const publicationDateRef = useRef<HTMLInputElement | null>(null);
  const barcodeNumberRef = useRef<HTMLInputElement | null>(null);
  const releaseDateRef = useRef<HTMLInputElement | null>(null);
  const compositionCopyrightRef = useRef<HTMLDivElement | null>(null);
  const phonographicCopyrightRef = useRef<HTMLDivElement | null>(null);
  const userIpiRef = useRef<HTMLInputElement | null>(null);
  const iswcRef = useRef<HTMLInputElement | null>(null);

  const { isSubmitting, setFieldValue, errors, values } =
    useFormikContext<UploadSongRequest>();

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
    scrollToError(errors, isSubmitting, [
      {
        error: errors.releaseDate,
        element: releaseDateRef.current,
      },
      {
        error: errors.publicationDate,
        element: publicationDateRef.current,
      },
      {
        error: errors.compositionCopyrightYear,
        element: compositionCopyrightRef.current,
      },
      {
        error: errors.compositionCopyrightOwner,
        element: compositionCopyrightRef.current,
      },
      {
        error: errors.phonographicCopyrightYear,
        element: phonographicCopyrightRef.current,
      },
      {
        error: errors.phonographicCopyrightOwner,
        element: phonographicCopyrightRef.current,
      },
      {
        error: errors.isrc,
        element: isrcRef.current?.getInputDOMNode(),
      },
      {
        error: errors.barcodeNumber,
        element: barcodeNumberRef.current,
      },
      {
        error: errors.userIpi,
        element: userIpiRef.current,
      },
      {
        error: errors.iswc,
        element: iswcRef.current,
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
        <TextInputField
          isOptional={ false }
          label="SCHEDULE RELEASE DATE"
          min={ earliestReleaseDate ? earliestReleaseDate : minDistributionDate }
          name="releaseDate"
          placeholder="Select a day"
          ref={ releaseDateRef }
          type="date"
          tooltipText={
            "When selecting a date to release your song on our " +
            "platform, please remember to factor in approval from any " +
            "contributors/featured artists as well as mint processing time " +
            "which can take up to 15 days."
          }
        />
        <TextInputField
          name="publicationDate"
          label="ORIGINAL PUBLICATION DATE"
          type="date"
          placeholder="Select a day"
          ref={ publicationDateRef }
          tooltipText={
            "If your song has already been launched on other platforms you " +
            "may input the release date here, but it is not required."
          }
          max={ new Date().toISOString().split("T")[0] }
        />
        <CopyrightInputField
          ref={ compositionCopyrightRef }
          label="COMPOSITION COPYRIGHT"
          yearFieldName="compositionCopyrightYear"
          ownerFieldName="compositionCopyrightOwner"
          copyrightType="composition"
          isOptional={ false }
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
        />
        <CopyrightInputField
          ref={ phonographicCopyrightRef }
          label="SOUND RECORDING COPYRIGHT"
          yearFieldName="phonographicCopyrightYear"
          ownerFieldName="phonographicCopyrightOwner"
          copyrightType="phonographic"
          isOptional={ false }
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
        />
        <DropdownSelectField
          name="barcodeType"
          label="RELEASE CODE TYPE"
          tooltipText={
            "If you already have a UPC or JAN code for this release, you can " +
            "select it as the code type here. Otherwise, select EAN as " +
            "the code type and enter the code number in the next field if " +
            "you have one, or if not, one will be generated for you."
          }
          placeholder="Select one"
          options={ [NONE_OPTION, "EAN", "UPC", "JAN"] }
        />
        <TextInputField
          disabled={ values.barcodeType === NONE_OPTION || !values.barcodeType }
          name="barcodeNumber"
          label="RELEASE CODE NUMBER"
          placeholder="0000000000"
          ref={ barcodeNumberRef }
          tooltipText={
            "A release code number is a unique code that identifies your " +
            "release. If you do not already have one, leave this field " +
            "blank, select EAN as Release Code type in the previous " +
            "field, and an EAN release code number will be generated for " +
            "you in this field."
          }
        />
        <TextInputField
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
          name="userIpi"
          placeholder="000000000"
          ref={ userIpiRef }
          tooltipText={
            "An IPI is a unique code assigned to songwriters, composers, " +
            "and music publishers. This information is optional; if you do " +
            "not already have an IPI or choose not to obtain one, leave " +
            "this field blank."
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
