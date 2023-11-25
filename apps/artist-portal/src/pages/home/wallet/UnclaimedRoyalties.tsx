import { Box, IconButton, Stack } from "@mui/material";
import { Button, Tooltip, Typography } from "@newm.io/studio/elements";
import currency from "currency.js";
import theme from "@newm.io/studio/theme";
import HelpIcon from "@mui/icons-material/Help";

interface UnclaimedRoyaltiesProps {
  unclaimedRoyalties: number;
}

export const UnclaimedRoyalties = ({ unclaimedRoyalties }: UnclaimedRoyaltiesProps) => {
  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.grey600,
        padding: 2.5,
        maxWidth: "400px",
        minHeight: "100px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
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
        <Stack direction="row" alignItems="center" gap={ 1 }>
          <Typography color="grey100" fontSize={ 12 }>
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
            variant="outlined"
            width="compact"
            disabled={ unclaimedRoyalties === 0 }
            sx={ { alignSelf: "center" } }
          >
            Claim now
          </Button>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default UnclaimedRoyalties;
