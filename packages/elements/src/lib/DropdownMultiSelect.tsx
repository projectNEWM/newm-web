import {
  FocusEvent,
  ForwardRefRenderFunction,
  HTMLProps,
  SyntheticEvent,
  forwardRef,
} from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import theme from "newm-theme";
import { Box, Stack } from "@mui/material";
import SelectedCheckboxIcon from "./assets/images/SelectedCheckboxIcon";
import UnselectedCheckboxIcon from "./assets/images/UnselectedCheckboxIcon";
import { WidthType } from "./types";
import TextInput from "./TextInput";
import ResultsList from "./styled/ResultsList";
import NoResultsText from "./styled/NoResultsText";

export interface DropdownMultiSelectProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref" | "value"> {
  readonly disabled?: boolean;
  readonly errorMessage?: string;
  readonly handleChange?: (
    event: SyntheticEvent,
    newValue: ReadonlyArray<string>
  ) => void;
  readonly handleBlur: (event: FocusEvent<HTMLInputElement, Element>) => void;
  readonly label?: string;
  readonly name: string;
  readonly tooltipText?: string;
  readonly noResultsText?: string;
  readonly options: ReadonlyArray<string>;
  readonly value?: Array<string>;
  readonly placeholder?: string;
  readonly widthType?: WidthType;
}

const DropdownMultiSelect: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownMultiSelectProps
> = (
  {
    disabled,
    errorMessage,
    label,
    name,
    noResultsText = "Nothing found",
    options = [],
    placeholder = "Select all that apply",
    value,
    handleChange,
    handleBlur,
    ...rest
  },
  ref
) => {
  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    getRootProps,
    groupedOptions,
    popupOpen,
    inputValue,
    value: selected,
  } = useAutocomplete({
    id: name,
    getOptionLabel: (option) => option,
    multiple: true,
    disableCloseOnSelect: true,
    options,
    value,
    onChange: (event, newValue) => {
      if (handleChange) {
        handleChange(event, newValue);
      }
    },
  });

  const getDisplayValue = () => {
    if (selected.length === 0) {
      return "";
    }

    if (selected.length < 5) {
      return selected.join(", ");
    }

    return `${selected.length} selected`;
  };

  const hasResults = groupedOptions.length > 0;
  const showNoResults = !hasResults && popupOpen;
  const displayValue = getDisplayValue();
  const inputProps = getInputProps();

  return (
    <Box sx={ { position: "relative" } }>
      <div { ...getRootProps() }>
        <Stack direction="row" alignItems="center">
          <TextInput
            { ...rest }
            { ...inputProps }
            onBlur={ (event: FocusEvent<HTMLInputElement, Element>) => {
              if (inputProps.onBlur) inputProps.onBlur(event);
              handleBlur(event);
            } }
            style={ {
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            } }
            disabled={ disabled }
            label={ label }
            value={ popupOpen ? inputValue : displayValue }
            placeholder={ popupOpen ? "Search" : placeholder }
            endAdornment={
              <ArrowDropDownIcon
                sx={ {
                  color: theme.colors.white,
                  transform: popupOpen ? "rotate(-180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease-in",
                } }
              />
            }
            errorMessage={ errorMessage }
            name={ name }
            ref={ ref }
          />
        </Stack>
      </div>

      { hasResults && (
        <ResultsList { ...getListboxProps() }>
          { (groupedOptions as typeof options).map((option, index) => {
            const isSelected = selected.includes(option);

            return (
              <li { ...getOptionProps({ option, index }) } key={ index }>
                <Stack direction="row" spacing={ 1 }>
                  { isSelected ? (
                    <SelectedCheckboxIcon />
                  ) : (
                    <UnselectedCheckboxIcon />
                  ) }
                  <span>{ option }</span>
                </Stack>
              </li>
            );
          }) }
        </ResultsList>
      ) }

      { showNoResults ? <NoResultsText>{ noResultsText }</NoResultsText> : null }
    </Box>
  );
};

export default forwardRef(DropdownMultiSelect);
