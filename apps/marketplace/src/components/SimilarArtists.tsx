import { FunctionComponent, useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Artist from "./Artist";
import { mockArtists } from "../temp/data";

const SimilarArtists: FunctionComponent = () => {
  const router = useRouter();

  // TEMP: simulate data loading
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectArtist = (id: string) => {
    router.push(`/artist/${id}`);
  };

  // TEMP: simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Stack mb={ 8 }>
      <Stack alignItems="center" mb={ 3.5 } mt={ 16 }>
        <Typography fontSize={ ["24px", "24px", "32px"] } variant="h3">
          SIMILAR ARTISTS
        </Typography>
      </Stack>

      <Grid justifyContent="center" rowGap={ 5 } container>
        { mockArtists
          .slice(0, 6)
          .map(
            ({ id, profileImageUrl, firstName, lastName, songCount }, idx) => {
              return (
                <Grid key={ id } lg={ 4 } sm={ 6 } xs={ 12 } item>
                  <Artist
                    imageUrl={ profileImageUrl }
                    isLoading={ isLoading }
                    orientation="row"
                    subtitle={ `${songCount} songs` }
                    title={ `${firstName} ${lastName}` }
                    onSelectArtist={ () => handleSelectArtist(id) }
                  />
                </Grid>
              );
            }
          ) }
      </Grid>
    </Stack>
  );
};

export default SimilarArtists;
