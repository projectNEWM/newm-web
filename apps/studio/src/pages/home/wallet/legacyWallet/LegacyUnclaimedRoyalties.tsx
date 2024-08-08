import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Button, Tooltip } from "@newm-web/elements";
import currency from "currency.js";
import theme from "@newm-web/theme";
import HelpIcon from "@mui/icons-material/Help";

interface LegacyUnclaimedRoyaltiesProps {
  unclaimedRoyalties: number;
}

export const LegacyUnclaimedRoyalties = ({
  unclaimedRoyalties,
}: LegacyUnclaimedRoyaltiesProps) => {
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
        <Stack alignItems="center" direction="row" gap={ 1 }>
          <Typography color={ theme.colors.grey100 } fontSize={ 12 }>
            ROYALTIES ACCRUED SO FAR
          </Typography>

          <Tooltip
            title={
              "These are the royalties you have accrued since minting " +
              "your song(s). All royalties will be available to claim " +
              "following the launch of the Stream Token Marketplace."
            }
          >
            <IconButton sx={ { padding: 0 } }>
              <HelpIcon sx={ { color: theme.colors.grey100 } } />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography fontSize="28px" fontWeight={ 700 }>
          { currency(unclaimedRoyalties).format() }
        </Typography>
      </Box>
      <Tooltip title={ "Feature coming soon" }>
        <Box sx={ { alignSelf: "center" } }>
          <Button
            color="white"
            disabled={ unclaimedRoyalties === 0 }
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

export default LegacyUnclaimedRoyalties;
