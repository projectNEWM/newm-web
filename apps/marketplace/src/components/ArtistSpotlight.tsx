import { FunctionComponent, useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import Artist from "./Artist";

const ArtistSpotlight: FunctionComponent = () => {
  // TEMP: simulate data loading
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectArtist = (name: string) => {
    // placeholder
    console.log("artist selected: ", name); // eslint-disable-line
  };

  // TEMP: simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Stack mb={ 8 }>
      <Stack alignItems="center" mb={ 5 } mt={ 20 }>
        <Typography fontSize={ ["24px", "24px", "32px"] } variant="h3">
          ARTIST SPOTLIGHT
        </Typography>
      </Stack>

      <Grid columnGap={ 15 } justifyContent="center" rowGap={ 5 } container>
        { tempArtistData.map(({ imageUrl, name, songCount }, idx) => {
          return (
            <Grid display="flex" key={ imageUrl } sx={ { cursor: "pointer" } }>
              <Artist
                imageUrl={ imageUrl }
                isLoading={ isLoading }
                orientation="column"
                subtitle={ `${songCount} songs` }
                title={ name }
                onSelectArtist={ handleSelectArtist }
              />
            </Grid>
          );
        }) }
      </Grid>
    </Stack>
  );
};

export default ArtistSpotlight;

const tempArtistData = [
  {
    imageUrl:
      "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
    name: "Lorem Ipsum",
    songCount: 4,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1695587661/mprskynp42oijtpaypeq.jpg",
    name: "Lorem Ipsum",
    songCount: 4,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
    name: "Lorem Ipsum",
    songCount: 4,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1695587661/mprskynp42oijtpaypeq.jpg",
    name: "Lorem Ipsum",
    songCount: 4,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
    name: "Lorem Ipsum",
    songCount: 4,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1695587661/mprskynp42oijtpaypeq.jpg",
    name: "Lorem Ipsum",
    songCount: 4,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
    name: "Lorem Ipsum",
    songCount: 4,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1695587661/mprskynp42oijtpaypeq.jpg",
    name: "Lorem Ipsum",
    songCount: 4,
  },
];
