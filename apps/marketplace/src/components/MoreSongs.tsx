import { FunctionComponent } from "react";
import { Box, useTheme } from "@mui/material";
import Sales from "./Sales";
import { mockArtist } from "../temp/data";
import { useGetSalesQuery } from "../modules/sale";

interface MoreSongsProps {
  readonly artistId?: string;
  readonly currentSaleId?: string;
}

const MoreSongs: FunctionComponent<MoreSongsProps> = ({
  artistId,
  currentSaleId,
}) => {
  const theme = useTheme();
  const { isLoading, data = [] } = useGetSalesQuery({
    artistIds: artistId ? [artistId] : undefined,
  });

  const withoutCurrentSale = data.filter(({ id }) => id !== currentSaleId);

  const artist = mockArtist;
  const artistFullName = `${artist.firstName} ${artist.lastName}`;

  const title = (
    <Box component="span">
      MORE FROM&nbsp;
      <Box component="span" sx={ { color: theme.colors.music } }>
        { artist.stageName || artistFullName }
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
