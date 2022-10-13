import {
  ForwardRefRenderFunction,
  ForwardedRef,
  HTMLProps,
  KeyboardEvent,
  forwardRef,
} from "react";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styled from "styled-components";
import theme from "theme";
import TextInput from "./TextInput";

interface Option {
  readonly label: string;
  readonly value: number;
}

export interface DropdownSelectProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref"> {
  readonly disabled?: boolean;
  readonly errorMessage?: string;
  readonly handleChange?: (option: Option) => void;
  readonly label: string;
  readonly name: string;
  readonly noResultsText?: string;
  readonly options: ReadonlyArray<Option>;
  readonly placeholder?: string;
}

const StyledDropdownSelectContainer = styled.div`
  position: relative;
`;

const StyledResultsList = styled.ul`
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

  li {
    cursor: pointer;
    padding: 12px 12px;

    &.Mui-focused {
      background-color: ${theme.colors.grey400};
    }
  }
`;

const StyledNoResultsText = styled.span`
  background-color: ${theme.colors.grey500};
  border-radius: 4px;
  border: 2px solid ${theme.colors.grey400};
  color: ${theme.colors.grey100};
  margin: 4px 0 0;
  padding: 12px 12px;
  position: absolute;
  width: 100%;
`;

const DropdownSelect: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownSelectProps
> = (
  {
    disabled,
    errorMessage,
    handleChange,
    label,
    name,
    noResultsText = "Nothing found",
    options,
    placeholder,
    value,
    ...rest
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    getRootProps,
    groupedOptions,
    popupOpen,
    inputValue,
  } = useAutocomplete<Option>({
    getOptionLabel: (option) => option.label,
    onChange: (event, newValue) => {
      if (handleChange && newValue) {
        handleChange(newValue);
      }
    },
    options,
    value: options.find((option) => option.value === value),
  });

  const hasResults = groupedOptions.length > 0;
  const showNoResults = !hasResults && popupOpen;

  /**
   * This prevents a form submission when input
   * text does not match any options.
   */
  const preventFormSubmit = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && inputValue !== value) event.preventDefault();
  };

  return (
    <StyledDropdownSelectContainer>
      <div { ...getRootProps() }>
        <TextInput
          ref={ ref }
          { ...rest }
          { ...getInputProps() }
          style={ { width: "125px", paddingRight: 0 } }
          disabled={ disabled }
          endAdornment={
            <ArrowDropDownIcon
              sx={ {
                pointerEvents: "none",
                color: theme.colors.white,
                transform: popupOpen ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "transform 200ms ease-in",
              } }
            />
          }
          errorMessage={ errorMessage }
          label={ label }
          name={ name }
          placeholder={ placeholder }
          onKeyDown={ preventFormSubmit }
        />
      </div>

      { hasResults ? (
        <StyledResultsList { ...getListboxProps() }>
          { (groupedOptions as typeof options).map((option, index) => (
            <li { ...getOptionProps({ option, index }) } key={ index }>
              { option.label }
            </li>
          )) }
        </StyledResultsList>
      ) : null }

      { showNoResults ? (
        <StyledNoResultsText>{ noResultsText }</StyledNoResultsText>
      ) : null }
    </StyledDropdownSelectContainer>
  );
};

export default forwardRef(DropdownSelect);
