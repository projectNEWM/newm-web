import { FunctionComponent } from "react";
import { Box, useTheme } from "@mui/material";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale";

interface MoreSongsProps {
  readonly artistId?: string;
  readonly artistName?: string;
  readonly currentSaleId?: string;
}

const MoreSongs: FunctionComponent<MoreSongsProps> = ({
  artistId,
  currentSaleId,
  artistName,
}) => {
  const theme = useTheme();
  const { isLoading, data = [] } = useGetSalesQuery({
    artistIds: artistId ? [artistId] : undefined,
  });

  // TODO: filter sales using query param when back-end updated
  const withoutCurrentSale = data.filter(({ id }) => id !== currentSaleId);

  const title = (
    <Box component="span">
      MORE FROM&nbsp;
      <Box component="span" sx={ { color: theme.colors.music } }>
        { artistName }
      </Box>
    </Box>
  );

  return (
    <Box mt={ [10, 8, 12.5] }>
      <Sales isLoading={ isLoading } sales={ withoutCurrentSale } title={ title } />
    </Box>
  );
};

export default MoreSongs;
