"use client";
import { Container, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import theme from "@newm-web/theme";
import { SongCard } from "@newm-web/components";

const Search = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  if (!searchTerm) {
    return (
      <Container sx={ { flexGrow: 1, mt: 5, textAlign: "center" } }>
        <Typography>SEARCH FOR ARTISTS OR SONGS</Typography>
      </Container>
    );
  }

  return (
    <Container sx={ { flexGrow: 1, mt: 5 } }>
      <Typography fontWeight={ 500 } variant="subtitle2">
        Showing results for:{ " " }
        <Typography
          color={ theme.colors.white }
          component="span"
          fontStyle={ "italic" }
          fontWeight={ 500 }
          variant="subtitle2"
        >
          { searchTerm }
        </Typography>
      </Typography>
      <Stack mt={ 2.5 }>
        <SongCard
          coverArtUrl={
            "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png"
          }
          isPlayable={ true }
          price="3.0"
          subtitle="Luis Viton"
          title="The Forest Fall"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onCardClick={ () => {} }
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPriceClick={ () => {} }
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSubtitleClick={ () => {} }
        />
      </Stack>
    </Container>
  );
};

export default Search;
