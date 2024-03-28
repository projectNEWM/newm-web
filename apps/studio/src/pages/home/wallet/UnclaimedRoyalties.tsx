import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Button, Tooltip } from "@newm-web/elements";
import currency from "currency.js";
import theme from "@newm-web/theme";
import HelpIcon from "@mui/icons-material/Help";

interface UnclaimedRoyaltiesProps {
  unclaimedRoyalties: number;
}

export const UnclaimedRoyalties = ({
  unclaimedRoyalties,
}: UnclaimedRoyaltiesProps) => {
  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.grey600,
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "400px",
        minHeight: "100px",
        padding: 2.5,
      } }
    >
      <Box
        sx={ {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingRight: [1, "unset"],
        } }
      >
        <Stack alignItems="center" direction="row" gap={ 1 } pb={ 1.5 }>
          <Typography
            color={ theme.colors.grey100 }
            fontSize={ 12 }
            fontWeight={ 500 }
          >
            YOU HAVE UNCLAIMED EARNINGS
          </Typography>

          <Tooltip
            title={
              "These earnings include the streaming royalties accumulated " +
              "for your distributed and minted songs. Select \"Claim now\" " +
              "to transfer unclaimed earnings to your wallet. Upon launch of " +
              "the NEWM Marketplace, any income generated through your " +
              "stream token sales will also be available to claim here."
            }
          >
            <IconButton sx={ { padding: 0 } }>
              <HelpIcon sx={ { color: theme.colors.grey100 } } />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography fontSize="24px" fontWeight={ 700 } lineHeight="28px" pb={ 0.5 }>
          { currency(unclaimedRoyalties, {
            pattern: "#!",
            symbol: "Ɲ",
          }).format() }
        </Typography>
        <Typography
          color={ theme.colors.grey200 }
          fontWeight={ 500 }
          variant="subtitle1"
        >
          ~$X.XX
        </Typography>
      </Box>
      <Tooltip title={ "Feature coming soon" }>
        <Box sx={ { alignSelf: "center" } }>
          <Button
            color="white"
            disabled={ true }
            sx={ { alignSelf: "center" } }
            variant="outlined"
            width="compact"
          >
            Claim now
          </Button>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default UnclaimedRoyalties;
