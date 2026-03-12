import { Link } from "@mui/material";

import { NEWM_STUDIO_COPYRIGHT_FAQ_URL } from "../../../common/constants";

export const FIELDS_TOOLTIP_COPY_TEXT = {
  explicit: `Explicit content includes strong or discriminatory language,
    "or depictions of sex, violence or substance abuse.`,

  instrumental: `Tracks without vocals or lyrics should be indicated as an instrumental.
     Failure to accurately label the track could result in a declined distribution submission.`,

  originalReleaseDate: `If your release has already been distributed on other platforms,
       you may input the original release date here, but it's not required.`,

  releaseCodeNumber: `A release code number is a unique code that identifies your release.
     If you do not already have one, leave this field blank,
      and a new release code number will be auto-generated for you.`,

  releaseCodeType: `If you already have a release code, 
    select the code type here and enter the code in the next field. If not, 
    leave this field blank and a new release code will be auto-generated for you.`,

  releaseDate: `When setting a release date, remember to factor in approval
      from any collaborators and/or featured artists, as well as quality assurance checks,
      which can take up to 15 days.`,
} as const;

export const FIELDS_TOOLTIP_COPY_NODE = {
  compositionCopyright: (
    <span>
      The copyright for a musical composition covers the music and lyrics of a
      track (not the recorded performance). It is typically owned by the
      songwriter and/or music publisher. If you are not the copyright holder of
      the track composition, please review{ " " }
      <Link
        href={ NEWM_STUDIO_COPYRIGHT_FAQ_URL }
        rel="noopener noreferrer"
        target="_blank"
      >
        copyright requirements
      </Link>{ " " }
      in our FAQ.
    </span>
  ),
  phonographicCopyright: (
    <span>
      The copyright in a sound recording covers the recording itself (it does
      not cover the music or lyrics of the track). It is typically owned by the
      artist and/or record label. If you are not the copyright holder of the
      sound recording, please review{ " " }
      <Link
        href={ NEWM_STUDIO_COPYRIGHT_FAQ_URL }
        rel="noopener noreferrer"
        target="_blank"
      >
        copyright requirements
      </Link>{ " " }
      in our FAQ.
    </span>
  ),
} as const;
