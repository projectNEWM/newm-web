import { Box, Icon, IconButton, Stack, Typography } from "@mui/material";
import { Button, Tooltip } from "@newm.io/studio/elements";
import currency from "currency.js";
import theme from "@newm.io/theme";
import HelpIcon from "@mui/icons-material/Help";
import CheckCircle from "@newm.io/studio/assets/images/CheckCircle";

interface ClaimedRoyaltiesProps {
  claimedRoyalties: number;
}

export const ClaimedRoyalties = ({ claimedRoyalties }: ClaimedRoyaltiesProps) => {
  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.grey600,
        padding: 2,
        maxWidth: "400px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 1.5,
      } }
    >
      <IconButton size="small" sx={ { p: 0 } }>
        <CheckCircle />
      </IconButton>
      <Box
        sx={ {
          display: "flex",
          flexDirection: "column",
          paddingRight: [1, "unset"],
          gap: 0.5,
        } }
      >
        <Stack
          sx={ {
            display: "flex",
            flexDirection: "row",
            paddingRight: [1, "unset"],
          } }
        >
          <Stack direction="row" alignItems="center" gap={ 1 }>
            <Typography color={ theme.colors.green } fontWeight={ 500 }>
              No pending royalites to claim.
            </Typography>

            <Tooltip
              title={
                "You have no royalties to claim at this time. Once you " +
                "accrue streaming royalties, they will be displayed and " +
                "ready to claim here."
              }
            >
              <IconButton sx={ { padding: 0 } }>
                <HelpIcon sx={ { color: theme.colors.grey100 } } />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Typography variant="subtitle1" fontWeight={ 500 }>
          Total royalties claimed so far: { currency(claimedRoyalties).format() }
        </Typography>
      </Box>
    </Box>
  );
};

export default ClaimedRoyalties;
