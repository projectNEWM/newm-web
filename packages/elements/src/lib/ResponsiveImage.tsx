import { Box, BoxProps } from "@mui/material";
import { FunctionComponent, HTMLProps, useState } from "react";

type ResponsiveImageProps = HTMLProps<HTMLImageElement> &
  Omit<BoxProps, "width" | "height">;

/**
 * A square shaped image that will fit the width of its container.
 * Rendering the actual image can take a brief moment before it is
 * sized correctly. For this reason, the component displays a simple
 * image that loads quickly and then replaces it with the actual
 * image after it loads.
 */
const ResponsiveImage: FunctionComponent<ResponsiveImageProps> = ({
  sx,
  ...rest
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      { !isImageLoaded && (
        <img
          alt="Square placeholder"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          style={ { opacity: 0 } }
          width="100%"
        />
      ) }

      <Box
        component="img"
        height="100%"
        sx={ { ...sx, display: isImageLoaded ? "inline-block" : "none" } }
        width="100%"
        onLoad={ () => setIsImageLoaded(true) }
        { ...rest }
      />
    </>
  );
};

export default ResponsiveImage;
