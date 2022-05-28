import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import { Typography } from "elements";

interface UploadOverlayContentProps {
  readonly icon: JSX.Element;
  readonly message: string;
}

/**
 * Displays content meant to be overlaid
 * on top of an upload image preview.
 */
const UploadOverlayContent: FunctionComponent<UploadOverlayContentProps> = ({
  icon,
  message,
}) => (
  <Stack
    spacing={ 1 }
    direction="column"
    sx={ { flexGrow: 1, justifyContent: "center", alignItems: "center" } }
  >
    { icon }

    <Typography variant="h5" textAlign="center" fontWeight="regular">
      { message }
    </Typography>
  </Stack>
);

export default UploadOverlayContent;
