import { Box, BoxProps, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import { FunctionComponent } from "react";

interface ReferralDataBoxProps extends BoxProps {
  readonly symbolAdornment?: string;
  readonly title: string;
  readonly value: number;
}

const ReferralDataBox: FunctionComponent<ReferralDataBoxProps> = ({
  value,
  title,
  symbolAdornment,
  sx,
}) => {
  return (
    <Box
      sx={ {
        alignItems: "center",
        border: `1px solid ${theme.colors.grey400}`,
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        px: [0, 3],
        py: [2, 3],
        width: "100%",
        ...sx,
      } }
    >
      <Typography
        align="center"
        mb={ 2 }
        textTransform={ "uppercase" }
        variant="subtitle2"
      >
        { title }
      </Typography>
      <Typography
        color={ theme.colors.music }
        fontSize={ 40 }
        fontWeight={ theme.typography.fontWeightSemiBold }
      >
        { symbolAdornment }
        { value }
      </Typography>
    </Box>
  );
};

export default ReferralDataBox;
