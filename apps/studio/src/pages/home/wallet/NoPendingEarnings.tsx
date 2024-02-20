import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import { CheckCircle } from "@newm-web/assets";
import theme from "@newm-web/theme";

export const NoPendingEarnings: FunctionComponent = () => (
  <Stack
    sx={ {
      backgroundColor: theme.colors.grey600,
      borderRadius: "6px",
      flexDirection: "row",
      gap: 1.5,
      p: 2,
      width: "fit-content",
    } }
  >
    <CheckCircle fill={ theme.colors.green } />
    <Stack>
      <Typography color={ theme.colors.green } fontWeight={ 500 }>
        No pending earnings to claim
      </Typography>
      <Typography color="grey200" fontWeight={ 500 }>
        Total earnings accrued so far: ##.##Ɲ (~$#.##)
      </Typography>
    </Stack>
  </Stack>
);
