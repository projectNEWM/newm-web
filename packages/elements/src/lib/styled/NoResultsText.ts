import theme from "@newm-web/theme";
import { css, styled } from "@mui/material/styles";
import { ReactNode } from "react";
import { WidthType } from "@newm-web/utils";

interface Props {
  readonly children?: ReactNode;
  readonly widthType?: WidthType;
}

const NoResultsText = styled("span")`
  background-color: ${theme.colors.grey500};
  border-radius: 4px;
  border: 2px solid ${theme.colors.grey400};
  color: ${theme.colors.grey100};
  margin: 4px 0 0;
  padding: 12px 12px;
  position: absolute;
  width: 100%;
  z-index: 1;

  ${({ widthType }: Props) =>
    widthType !== "full" &&
    css`
      max-width: ${theme.inputField.maxWidth};
    `}
`;

export default NoResultsText;
