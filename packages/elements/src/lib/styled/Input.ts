import theme from "@newm-web/theme";
import styled from "styled-components";

export const inputStyles = `
  width: 100%;
  display: flex;
  flex-grow: 1;
  background: ${theme.colors.grey600};
  color-scheme: dark;
  border-width: 0;
  font-family: ${theme.inputField.fontFamily};
  font-size: ${theme.inputField.fontSize};
  font-weight: ${theme.inputField.fontWeight};
  line-height: ${theme.inputField.lineHeight};
  padding: ${theme.inputField.padding};

  &::placeholder {
    color: ${theme.colors.grey100};
  }

  &:focus {
    outline: none;
  }

  /* Hide number arrows - Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide number arrows - Firefox */
  &: [type=number] {
    -moz-appearance: textfield;
  }

  /* Change date "placeholder" text color to match other fields*/
  &[type="date"]:not([value*="-"])::-webkit-datetime-edit {
    color: ${theme.colors.grey100};
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

export default Input;
