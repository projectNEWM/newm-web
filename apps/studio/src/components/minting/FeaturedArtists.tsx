import { FunctionComponent } from "react";
import { Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@newm-web/elements";
import theme from "@newm-web/theme";
import Details from "./Details";
import {
  Featured,
  getCollaboratorInfo,
  useGetCollaboratorsQuery,
} from "../../modules/song";

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
        const collaboratorInfo = getCollaboratorInfo(
          featuredArtist.email,
          collaborators
        );

        return (
          <Stack
            key={ featuredArtist.email }
            sx={ {
              alignItems: "center",
              columnGap: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 2,
            } }
          >
            <Details
              email={ featuredArtist.email }
              firstName={ collaboratorInfo.firstName }
              lastName={ collaboratorInfo.lastName }
              pictureUrl={ collaboratorInfo.pictureUrl }
            />

            <Button
              color="white"
              disabled={ isDeleteDisabled }
              sx={ { ml: [1, 1, 3] } }
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
