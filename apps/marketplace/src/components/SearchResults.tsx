import { FunctionComponent } from "react";
import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { SaleStatus } from "@newm-web/types";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale";

interface SearchResultsProps {
  readonly query: string;
}

const SearchResults: FunctionComponent<SearchResultsProps> = ({ query }) => {
  const theme = useTheme();
  const { isLoading, data: sales = [] } = useGetSalesQuery({
    phrase: query,
    saleStatuses: [SaleStatus.Started],
  });

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
        isLoading={ isLoading }
        noResultsContent={
          <Box flex={ 1 } justifyContent="flex-start">
            <Typography sx={ { textAlign: "left" } }>
              No results found. Please try again using the song title or artist
              name.
            </Typography>
          </Box>
        }
        // TODO: update back-end so no results are returned whery query is empty
        sales={ query ? sales : [] }
      />
    </Stack>
  );
};

export default SearchResults;
