import { FunctionComponent } from "react";
import { BoxProps } from "@mui/material";
import SolidOutline from "./styled/SolidOutline";

interface ImagePreviewProps extends BoxProps {
  readonly imageUrl: string;
}

/**
 * Displays an image with a dark overlay as a background
 * so that content can be rendered on top of it.
 */
const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
  imageUrl,
  children,
  sx,
  ...boxProps
}) => {
  const overlay = "rgba(0, 0, 0, 0.4)";

  return (
    <SolidOutline
      sx={ {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        background: `linear-gradient(0deg, ${overlay}, ${overlay}), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...sx,
      } }
      { ...boxProps }
    >
      { children }
    </SolidOutline>
  );
};

export default ImagePreview;
