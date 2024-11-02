import { Stack, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import {
  convertNewmiesToNewm,
  formatNewmAmount,
  resizeCloudinaryImage,
} from "@newm-web/utils";
import { FunctionComponent } from "react";

interface SinglePortfolioItemProps {
  readonly coverArtUrl?: string;
  readonly earnings?: number;
  readonly id: string;
  readonly index: number;
  readonly title: string;
}

const SinglePortfolioItem: FunctionComponent<SinglePortfolioItemProps> = ({
  coverArtUrl,
  earnings = 0,
  id,
  index,
  title,
}) => {
  return (
    <Stack
      key={ id }
      sx={ {
        alignItems: "center",
        backgroundColor: index % 2 === 0 ? theme.colors.grey600 : "transparent",
        borderRadius: "4px",
        flexDirection: "row",
        gap: 2.5,
        minHeight: "56px",
        padding: 1,
      } }
    >
      { coverArtUrl ? (
        <img
          alt="Album cover"
          src={ resizeCloudinaryImage(coverArtUrl) }
          style={ {
            borderRadius: "50%",
          } }
        />
      ) : (
        <Stack
          sx={ {
            backgroundColor: theme.colors.grey400,
            borderRadius: "50%",
            height: "40px",
            width: "40px",
          } }
        />
      ) }

      <Typography fontWeight={ 500 }>{ title }</Typography>
      <Typography fontSize={ 12 } fontWeight={ 700 } ml="auto">
        { formatNewmAmount(convertNewmiesToNewm(earnings)) }
      </Typography>
    </Stack>
  );
};

export default SinglePortfolioItem;
