import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import { SongCard } from "@newm-web/components";
import { mockSongs } from "../temp/data";
/**
 * TODO: Implement useGetSongsQuery and playback functionality,
 * see studio/src/pages/home/owners/Songs.tsx
 */

const Songs: FunctionComponent = () => {
  return (
    <Stack alignItems="center" mt={ [7.5, 7.5, 10] }>
      { mockSongs.length ? (
        <>
          <Typography fontSize={ ["24px", "24px", "32px"] } variant="h3">
            JUST RELEASED
          </Typography>
          <Stack
            sx={ {
              columnGap: 2,
              display: "grid",
              gridAutoFlow: "column",
              gridTemplateRows: "auto auto",
              maxWidth: "100%",
              mt: 5,
              overflowX: "auto",
              pb: 2.5,
              rowGap: 3,
            } }
          >
            { mockSongs.map((song) => {
              const genresString = song.genres.join(", ");

              return (
                <SongCard
                  coverArtUrl={ song.coverArtUrl }
                  isPlayable={ !!song.streamUrl }
                  key={ song.id }
                  price={ song.price }
                  subtitle={ genresString }
                  title={ song.title }
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onPriceClick={ () => {} }
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onSubtitleClick={ () => {} }
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onTitleClick={ () => {} }
                />
              );
            }) }
          </Stack>
        </>
      ) : (
        <Typography sx={ { marginTop: 8, textAlign: "center" } }>
          No songs to display at this time.
        </Typography>
      ) }
    </Stack>
  );
};

export default Songs;
