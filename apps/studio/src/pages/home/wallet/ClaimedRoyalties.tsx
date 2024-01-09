import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Tooltip } from "@newm-web/elements";
import currency from "currency.js";
import theme from "@newm-web/theme";
import HelpIcon from "@mui/icons-material/Help";
import { CheckCircle } from "@newm-web/assets";

interface ClaimedRoyaltiesProps {
  claimedRoyalties: number;
}

export const ClaimedRoyalties = ({
  claimedRoyalties,
}: ClaimedRoyaltiesProps) => {
  return (
    <Box
      sx={ {
        alignItems: "flex-start",
        backgroundColor: theme.colors.grey600,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "row",
        gap: 1.5,
        maxWidth: "400px",
        padding: 2,
      } }
    >
      <IconButton size="small" sx={ { p: 0 } }>
        <CheckCircle fill={ theme.colors.green } />
      </IconButton>
      <Box
        sx={ {
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          paddingRight: [1, "unset"],
        } }
      >
        <Stack
          sx={ {
            display: "flex",
            flexDirection: "row",
            paddingRight: [1, "unset"],
          } }
        >
          <Stack alignItems="center" direction="row" gap={ 1 }>
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
        <Typography fontWeight={ 500 } variant="subtitle1">
          Total royalties claimed so far: { currency(claimedRoyalties).format() }
        </Typography>
      </Box>
    </Box>
  );
};

export default ClaimedRoyalties;
