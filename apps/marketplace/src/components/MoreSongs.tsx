import { FunctionComponent } from "react";
import { Box, Typography, useTheme } from "@mui/material";
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
  const { isLoading, data: sales = [] } = useGetSalesQuery({
    artistIds: artistId ? [artistId] : undefined,
    ids: currentSaleId ? [`-${currentSaleId}`] : undefined,
    limit: 8,
  });

  const title = (
    <Typography
      fontSize={ ["24px", "24px", "32px"] }
      textAlign="center"
      textTransform="uppercase"
      variant="h3"
    >
      MORE FROM&nbsp;
      <Box component="span" sx={ { color: theme.colors.music } }>
        { artistName }
      </Box>
    </Typography>
  );

  return (
    <Box mt={ [10, 8, 12.5] }>
      <Sales isLoading={ isLoading } sales={ sales } title={ title } />
    </Box>
  );
};

export default MoreSongs;
