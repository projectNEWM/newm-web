import { Box, BoxProps } from "@mui/material";
import {
  FunctionComponent,
  HTMLProps,
  useEffect,
  useRef,
  useState,
} from "react";

type ResponsiveImagePropsBase = BoxProps & HTMLProps<HTMLImageElement>;
type ResponsiveImageProps = Omit<ResponsiveImagePropsBase, "width" | "height">;

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
  const imgRef = useRef<HTMLImageElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  /**
   * Occasionally image onLoad will not trigger on initial page load,
   * this ensures the non-placeholder image is still rendered.
   */
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsImageLoaded(true);
    }
  }, []);

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
        ref={ imgRef }
        sx={ {
          ...sx,
          display: isImageLoaded ? "inline-block" : "none",
          // hide any cropping issues or empty space around image
          transform: "scale(1.005)",
        } }
        width="100%"
        onLoad={ () => setIsImageLoaded(true) }
        { ...rest }
      />
    </>
  );
};

export default ResponsiveImage;
