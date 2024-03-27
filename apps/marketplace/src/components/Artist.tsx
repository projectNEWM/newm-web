import { Box, Stack, Typography } from "@mui/material";
import { resizeCloudinaryImage } from "@newm-web/utils";
import { FunctionComponent } from "react";
import { Clickable } from "@newm-web/elements";
import ArtistSkeleton from "./skeletons/ArtistSkeleton";

interface ArtistProps {
  readonly imageUrl: string;
  readonly isLoading: boolean;
  readonly onSelectArtist: VoidFunction;
  readonly orientation: "row" | "column";
  readonly subtitle: string;
  readonly title: string;
}

/**
 * Image and information for an artist. Can be vertically
 * or horizontally aligned.
 */
const Artist: FunctionComponent<ArtistProps> = ({
  imageUrl,
  title,
  isLoading,
  subtitle,
  orientation,
  onSelectArtist,
}) => {
  if (isLoading) {
    return <ArtistSkeleton orientation={ orientation } />;
  }

  return (
    <Clickable aria-label={ `${title}-artist-profile` } onClick={ onSelectArtist }>
      <Stack columnGap={ 3.5 } direction={ orientation } rowGap={ 2 }>
        <Box
          alt={ `${title}-artist-profile` }
          component="img"
          height={ [150, 150, 200] }
          src={ resizeCloudinaryImage(imageUrl, {
            height: 200,
            width: 200,
          }) }
          style={ { borderRadius: "50%", maxWidth: "100%" } }
          width={ [150, 150, 200] }
        />
        <Stack
          justifyContent="center"
          spacing={ 0.25 }
          textAlign={ orientation === "row" ? "start" : "center" }
        >
          <Typography variant="h4">{ title }</Typography>
          <Typography variant="subtitle1">{ subtitle }</Typography>
        </Stack>
      </Stack>
    </Clickable>
  );
};

export default Artist;
