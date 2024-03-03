import { FunctionComponent, useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import Artist from "./Artist";

const Artists: FunctionComponent = () => {
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
    <Stack>
      <Stack alignItems="center" mb={ 5 } mt={ 20 }>
        <Typography variant="h3">ARTIST SPOTLIGHT</Typography>
      </Stack>

      <Grid justifyContent="center" container>
        { tempArtistData.map(({ imageUrl, name, songCount }) => {
          return (
            <Grid
              display="flex"
              key={ imageUrl }
              mb={ 5 }
              pr={ 2 }
              sx={ { cursor: "pointer" } }
            >
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

export default Artists;

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
];
