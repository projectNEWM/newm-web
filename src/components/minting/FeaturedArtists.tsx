import { Box, Stack, useTheme } from "@mui/material";
import { Button, Typography } from "elements";
import { Featured } from "modules/song";
import { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface FeaturedArtistsProps {
  readonly featured: ReadonlyArray<Featured>;
  readonly isDeleteDisabled?: boolean;
  readonly onDelete: (
    featured: Featured,
    featuredArtists: ReadonlyArray<Featured>
  ) => void;
}

/**
 * Allows for displaying and updating featured artists when minting a song.
 */
const FeaturedArtists: FunctionComponent<FeaturedArtistsProps> = ({
  featured,
  onDelete,
  isDeleteDisabled = false,
}) => {
  const theme = useTheme();

  return (
    <Box>
      { featured.map((featuredArtist) => {
        return (
          <Stack
            key={ featuredArtist.email }
            sx={ {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            } }
          >
            <Typography variant="subtitle1">{ featuredArtist.email }</Typography>

            <Button
              color="white"
              sx={ { ml: 3 } }
              disabled={ isDeleteDisabled }
              variant="secondary"
              width="icon"
              onClick={ () => {
                onDelete(featuredArtist, featured);
              } }
            >
              <CloseIcon sx={ { color: theme.colors.white } } />
            </Button>
          </Stack>
        );
      }) }
    </Box>
  );
};

export default FeaturedArtists;
