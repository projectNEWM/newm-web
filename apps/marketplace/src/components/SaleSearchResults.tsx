import { FunctionComponent } from "react";
import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale";

interface SimilarSongsProps {
  readonly query: string;
}

const SimilarSongs: FunctionComponent<SimilarSongsProps> = ({ query }) => {
  const theme = useTheme();
  const { isLoading, data: sales = [] } = useGetSalesQuery({ phrase: query });

  if (!query) {
    throw new Error("No query param present");

    return null;
  }

  return (
    <Stack my={ 8 } rowGap={ 2.5 }>
      <Box>
        { isLoading ? (
          <Skeleton height={ 18 } width={ 240 } />
        ) : (
          <Typography fontWeight={ 500 } variant="subtitle2">
            Showing results for:{ " " }
            <Typography
              color={ theme.colors.white }
              component="span"
              fontStyle={ "italic" }
              fontWeight={ 500 }
              sx={ { textAlign: "left" } }
              variant="subtitle2"
            >
              { query }
            </Typography>
          </Typography>
        ) }
      </Box>

      <Sales
        hasTitle={ false }
        isLoading={ isLoading }
        noResultsContent={
          <Box flex={ 1 } justifyContent="flex-start">
            <Typography sx={ { textAlign: "left" } }>
              No results found. Please try again using the song title or artist
              name.
            </Typography>
          </Box>
        }
        sales={ sales }
      />
    </Stack>
  );
};

export default SimilarSongs;
