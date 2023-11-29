import { FunctionComponent } from "react";
import { Link, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { NEWM_STUDIO_FAQ_URL, NEWM_SUPPORT_EMAIL } from "common";
import { SwitchInputField } from "components";
import { Alert, HorizontalLine } from "elements";
import { UploadSongRequest } from "modules/song";

interface CoverRemixSampleProps {
  disabled?: boolean;
}

export const CoverRemixSample: FunctionComponent<CoverRemixSampleProps> = ({
  disabled = false,
}) => {
  const { values } = useFormikContext<UploadSongRequest>();

  return (
    <SwitchInputField
      disabled={ disabled }
      name="isCoverRemixSample"
      title={
        "Is this song a cover, remix, mixtape, mashup, " +
        "or contain samples and/or any part of the intellectual property of another work?"
      }
    >
      { values.isCoverRemixSample && (
        <>
          <HorizontalLine mt={ 2 } />

          <Alert severity="warning">
            <Typography color="yellow">ATTENTION!</Typography>
            <Typography color="yellow" fontWeight={ 400 } variant="subtitle1">
              You may proceed with this process to upload your song; however, to
              ensure completion of the distribution and minting process you must
              secure and send the proper license(s) from the copyright holder(s)
              to{ " " }
              <Link
                href={ `mailto:${NEWM_SUPPORT_EMAIL}` }
                sx={ {
                  color: "yellow",
                  textDecorationColor: "yellow",
                } }
              >
                { NEWM_SUPPORT_EMAIL }
              </Link>{ " " }
              . See{ " " }
              <Link
                href={ NEWM_STUDIO_FAQ_URL }
                rel="noopener noreferrer"
                target="_blank"
                sx={ {
                  color: "yellow",
                  textDecorationColor: "yellow",
                } }
              >
                Copyright requirements
              </Link>{ " " }
              in our FAQ for more info.
            </Typography>
          </Alert>
        </>
      ) }
    </SwitchInputField>
  );
};
