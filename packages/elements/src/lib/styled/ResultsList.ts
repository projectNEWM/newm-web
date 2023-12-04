import { HTMLAttributes } from "react";
import { styled, css } from "@mui/material/styles";
import theme from "@newm-web/theme";
import { WidthType } from "@newm-web/utils";

interface ResultsListProps extends HTMLAttributes<HTMLUListElement> {
  readonly widthType?: WidthType;
}

const ResultsList = styled("ul")`
  background-color: ${theme.colors.grey500};
  border-radius: 4px;
  border: 2px solid ${theme.colors.grey400};
  list-style: none;
  margin: 4px 0 0;
  max-height: 200px;
  overflow: auto;
  padding: 0;
  position: absolute;
  width: 100%;
  z-index: 10;
  ${({ widthType }: ResultsListProps) =>
    widthType !== "full" &&
    css`
      max-width: ${theme.inputField.maxWidth};
    `}

  li {
    cursor: pointer;
    padding: 12px 12px;
    min-height: 44px;

    &.Mui-focused {
      background-color: ${theme.colors.grey400};
    }
  }
`;

export default ResultsList;
