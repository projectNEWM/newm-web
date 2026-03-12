import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { useFormikContext } from "formik";

import { Box, Stack, useTheme } from "@mui/material";

import { isValueInArray, scrollToError } from "@newm-web/utils";
import {
  CopyrightInputField,
  ErrorMessage,
  HorizontalLine,
  SwitchInputField,
  TextInputField,
} from "@newm-web/elements";
import { MintingStatus } from "@newm-web/types";

import SelectCoCreators from "../../../../../components/minting/SelectCoCreators";
import {
  Creditor,
  Featured,
  Owner,
  UploadSongThunkRequest,
  emptySong,
  useGetSongQuery,
} from "../../../../../modules/song";
import { NONE_OPTION } from "../../../../../common";
import { CoverRemixSample } from "../../../../../components";
import {
  FIELDS_TOOLTIP_COPY_NODE,
  FIELDS_TOOLTIP_COPY_TEXT,
} from "../../constants";

const AdvancedTrackDetails = () => {
  const theme = useTheme();
  const { trackId } = useParams<"trackId">();

  // TODO: Replace with useGetTrackQuery once API is updated.
  const { data: track = emptySong } = useGetSongQuery(trackId as string, {
    skip: !trackId,
  });

  const isDeclined = track.mintingStatus === MintingStatus.Declined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isrcRef = useRef<any>(null);
  const publicationDateRef = useRef<HTMLInputElement | null>(null);
  const barcodeNumberRef = useRef<HTMLInputElement | null>(null);
  const releaseDateRef = useRef<HTMLInputElement | null>(null);
  const compositionCopyrightRef = useRef<HTMLDivElement | null>(null);
  const phonographicCopyrightRef = useRef<HTMLDivElement | null>(null);
  const coCreatorsRef = useRef<HTMLDivElement | null>(null);
  const ipiRef = useRef<HTMLInputElement | null>(null);
  const iswcRef = useRef<HTMLInputElement | null>(null);

  const { isSubmitting, setFieldValue, errors, touched, values } =
    useFormikContext<UploadSongThunkRequest>();

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
      { element: coCreatorsRef.current, error: errors.creditors },
      { element: coCreatorsRef.current, error: errors.owners },
    ]);
  }, [errors, isSubmitting, isrcRef]);

  const handleChangeOwners = (owners: ReadonlyArray<Owner>) => {
    setFieldValue("owners", owners);
  };

  const handleChangeCreditors = (creditors: ReadonlyArray<Creditor>) => {
    setFieldValue("creditors", creditors);
  };

  const handleChangeFeatured = (featured: ReadonlyArray<Featured>) => {
    setFieldValue("featured", featured);
  };

  return (
    <Stack
      marginX={ ["auto", "auto", "unset"] }
      maxWidth={ ["340px", "340px", "700px"] }
      spacing={ 3 }
    >
      <SwitchInputField
        name="isInstrumental"
        title="Is this track an instrumental?"
        tooltipText={ FIELDS_TOOLTIP_COPY_TEXT.instrumental }
      />
      <SwitchInputField
        name="isExplicit"
        title="Does the track contain explicit content?"
        tooltipText={ FIELDS_TOOLTIP_COPY_TEXT.explicit }
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
          label="ISWC"
          mask="T-999999999-9"
          maskChar={ null }
          name="iswc"
          placeholder="T-000000000-0"
          ref={ iswcRef }
          tooltipText={
            "An ISWC is the unique identification code of your track " +
            "(unlike ISRC which is linked to  the specific recording). " +
            "This information is optional; if you do not already have an " +
            "ISWC or choose not to obtain one, whether this is an original " +
            "track or a cover, leave this field blank."
          }
        />

        <CopyrightInputField
          copyrightType="composition"
          disabled={ isDeclined }
          label="COMPOSITION COPYRIGHT"
          ownerFieldName="compositionCopyrightOwner"
          ref={ compositionCopyrightRef }
          tooltipText={ FIELDS_TOOLTIP_COPY_NODE.compositionCopyright }
          yearFieldName="compositionCopyrightYear"
        />

        <CopyrightInputField
          copyrightType="phonographic"
          disabled={ isDeclined }
          label="SOUND RECORDING COPYRIGHT"
          ownerFieldName="phonographicCopyrightOwner"
          ref={ phonographicCopyrightRef }
          tooltipText={ FIELDS_TOOLTIP_COPY_NODE.phonographicCopyright }
          yearFieldName="phonographicCopyrightYear"
        />
      </Stack>

      <HorizontalLine />

      <Stack spacing={ 3 }>
        <Box
          ref={ coCreatorsRef }
          sx={ {
            backgroundColor: theme.colors.grey600,
            border: `2px solid ${theme.colors.grey400}`,
            borderRadius: "4px",
          } }
        >
          <SelectCoCreators
            creditors={ values.creditors }
            featured={ values.featured }
            isAddDeleteDisabled={ isDeclined }
            owners={ values.owners }
            onChangeCreditors={ handleChangeCreditors }
            onChangeFeatured={ handleChangeFeatured }
            onChangeOwners={ handleChangeOwners }
          />
        </Box>

        { !!touched.owners && !!errors.owners && (
          <Box mt={ 0.5 }>
            <ErrorMessage>{ errors.owners as string }</ErrorMessage>
          </Box>
        ) }

        { !!touched.creditors && !!errors.creditors && (
          <Box mt={ 0.5 }>
            <ErrorMessage>{ errors.creditors as string }</ErrorMessage>
          </Box>
        ) }
      </Stack>
    </Stack>
  );
};

export default AdvancedTrackDetails;
