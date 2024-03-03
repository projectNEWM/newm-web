import { Box, Stack, Typography, useTheme } from "@mui/material";
import { resizeCloudinaryImage } from "@newm-web/utils";
import Image from "next/image";
import { FunctionComponent } from "react";
import ArtistSkeleton from "./skeletons/ArtistSkeleton";

interface ArtistProps {
  readonly imageUrl: string;
  readonly isLoading: boolean;
  readonly onSelectArtist: (param: string) => void;
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
  const theme = useTheme();

  if (isLoading) {
    return <ArtistSkeleton orientation={ orientation } />;
  }

  return (
    <Stack
      direction={ orientation }
      sx={ { cursor: "pointer" } }
      onClick={ () => onSelectArtist(title) }
    >
      <Box pb={ 2 } px={ 3.5 }>
        <Image
          alt={ `${title}-artist-profile` }
          height={ 200 }
          src={ resizeCloudinaryImage(imageUrl, {
            height: 200,
            width: 200,
          }) }
          style={ { borderRadius: "50%", maxWidth: "100%" } }
          width={ 200 }
        />
      </Box>
      <Stack
        justifyContent="center"
        spacing={ 0.25 }
        textAlign={ orientation === "row" ? "start" : "center" }
      >
        <Typography variant="h4">{ title }</Typography>
        <Typography
          sx={ { color: theme.colors.grey100, fontWeight: 400 } }
          variant="h4"
        >
          { subtitle }
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Artist;
