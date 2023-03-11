import {
  ForwardRefRenderFunction,
  ForwardedRef,
  HTMLProps,
  forwardRef,
} from "react";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import theme from "theme";
import { Box, Stack } from "@mui/material";
import SelectedCheckboxIcon from "assets/images/SelectedCheckboxIcon";
import UnselectedCheckboxIcon from "assets/images/UnselectedCheckboxIcon";
import TextInput from "./TextInput";
import ResultsList from "./styled/ResultsList";
import NoResultsText from "./styled/NoResultsList";

export interface DropdownMultiSelectProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref" | "value"> {
  readonly disabled?: boolean;
  readonly errorMessage?: string;
  readonly handleChange?: (newValue: ReadonlyArray<string>) => void;
  readonly label: string;
  readonly name: string;
  readonly noResultsText?: string;
  readonly options: ReadonlyArray<string>;
  readonly value?: ReadonlyArray<string>;
  readonly placeholder?: string;
  readonly widthType?: "default" | "full";
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
    options,
    placeholder = "Select all that apply",
    value,
    handleChange,
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
    value: internalValue,
  } = useAutocomplete({
    id: name,
    getOptionLabel: (option) => option,
    multiple: true,
    disableCloseOnSelect: true,
    options,
    onChange: (event, newValue) => {
      if (handleChange) {
        handleChange(newValue);
      }
    },
  });

  const selected = value || internalValue;

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
  const showNoResults = !!inputValue && !hasResults && popupOpen;
  const displayValue = getDisplayValue();

  return (
    <Box sx={ { position: "relative" } }>
      <div { ...getRootProps() }>
        <Stack direction="row" alignItems="center">
          <TextInput
            ref={ ref }
            { ...rest }
            { ...getInputProps() }
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
          />
        </Stack>
      </div>

      { groupedOptions.length > 0 && (
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
