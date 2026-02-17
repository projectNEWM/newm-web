import { FunctionComponent } from "react";

import { Link } from "@mui/material";

import { NEWM_SUPPORT_LINK } from "../../../common";

const ReleaseDeletionHelp: FunctionComponent = () => {
  return (
    <span>
      To delete a release for which distribution is in process or has been
      completed, please issue a Takedown Request via the&nbsp;
      <Link href={ NEWM_SUPPORT_LINK } rel="noopener noreferrer" target="_blank">
        NEWM Support Portal
      </Link>
      . Please note that we are unable to delete a release for which the
      artist(s) does not hold 100% of the Stream Tokens.
    </span>
  );
};

export default ReleaseDeletionHelp;
