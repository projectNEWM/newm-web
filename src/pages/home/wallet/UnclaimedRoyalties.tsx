import { Box } from "@mui/material";
import { OutlinedButtonNoGradient, Typography } from "elements";
import theme from "theme";

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
        <Typography color="grey100" fontSize={ 12 }>
          UNCLAIMED{ " " }
          <Box
            component="span"
            sx={ {
              display: ["none", "inline"],
            } }
          >
            ROYALTIES
          </Box>
        </Typography>
        <Typography fontSize="28px" fontWeight={ 700 }>
          ${ unclaimedRoyalties }
        </Typography>
      </Box>
      <OutlinedButtonNoGradient>CLAIM ROYALTIES</OutlinedButtonNoGradient>
    </Box>
  );
};

export default UnclaimedRoyalties;
