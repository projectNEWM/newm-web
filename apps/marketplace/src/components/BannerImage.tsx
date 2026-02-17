import { Box, useTheme } from "@mui/material";
import { resizeCloudinaryImage, useBetterMediaQuery } from "@newm-web/utils";
import { FunctionComponent } from "react";

interface BannerImageProps {
  readonly imageUrl?: string;
  readonly isLoading?: boolean;
}

const BannerImage: FunctionComponent<BannerImageProps> = ({
  imageUrl,
  isLoading,
}) => {
  const theme = useTheme();

  const isBelowSmBreakpoint = useBetterMediaQuery(
    `(max-width: ${theme.breakpoints.values.sm}px)`
  );

  const resizedCoverImage = resizeCloudinaryImage(imageUrl, {
    height: 200,
    width: 1600,
  });

  if (isLoading) {
    return <Box height={ 200 } width="100%" />;
  }

  return (
    <Box
      aria-label="Artist banner"
      sx={ {
        backgroundImage: `url(${resizedCoverImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: isBelowSmBreakpoint ? "130px" : "200px",
      } }
    />
  );
};

export default BannerImage;
