import theme from "theme";
import styled, { css } from "styled-components";
import { DropdownMultiSelectProps } from "elements/DropdownMultiSelect";

const NoResultsText = styled.span`
  background-color: ${theme.colors.grey500};
  border-radius: 4px;
  border: 2px solid ${theme.colors.grey400};
  color: ${theme.colors.grey100};
  margin: 4px 0 0;
  padding: 12px 12px;
  position: absolute;
  width: 100%;
  z-index: 1;

  ${({ widthType }: DropdownMultiSelectProps) =>
    widthType !== "full" &&
    css`
      max-width: ${theme.inputField.maxWidth};
    `}
`;

export default NoResultsText;
