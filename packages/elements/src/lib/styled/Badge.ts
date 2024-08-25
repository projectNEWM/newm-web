import { Badge as BadgeBase, BadgeProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "@newm-web/theme";
import { FunctionComponent } from "react";

const Badge: FunctionComponent<BadgeProps> = styled(BadgeBase)`
  .MuiBadge-dot {
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    border-radius: 50%;
  }
`;

export default Badge;
