import { FunctionComponent } from "react";
import { Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@newm.io/studio/elements";
import { Featured, useGetCollaboratorsQuery } from "@newm.io/studio/modules/song";
import theme from "@newm.io/studio/theme";
import Details from "./Details";
import { getCollaboratorInfo } from "./utils";

interface FeaturedArtistsProps {
  readonly featured: ReadonlyArray<Featured>;
  readonly isDeleteDisabled?: boolean;
  readonly onDelete: (featured: Featured, featuredArtists: ReadonlyArray<Featured>) => void;
}

/**
 * Allows for displaying and updating featured artists when minting a song.
 */
const FeaturedArtists: FunctionComponent<FeaturedArtistsProps> = ({ featured, onDelete, isDeleteDisabled = false }) => {
  const emails = featured.map((featuredArtist) => featuredArtist.email);

  const { data: collaborators } = useGetCollaboratorsQuery(
    {
      emails,
    },
    {
      skip: !emails.length,
    }
  );

  return (
    <Box>
      { featured.map((featuredArtist) => {
        const collaboratorInfo = getCollaboratorInfo(featuredArtist.email, collaborators);

        return (
          <Stack
            key={ featuredArtist.email }
            sx={ {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              columnGap: 1,
            } }
          >
            <Details
              email={ featuredArtist.email }
              pictureUrl={ collaboratorInfo.pictureUrl }
              firstName={ collaboratorInfo.firstName }
              lastName={ collaboratorInfo.lastName }
            />

            <Button
              color="white"
              sx={ { ml: [1, 1, 3] } }
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
