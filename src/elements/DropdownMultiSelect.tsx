import {
  FocusEvent,
  ForwardRefRenderFunction,
  ForwardedRef,
  HTMLProps,
  KeyboardEvent,
  SyntheticEvent,
  forwardRef,
  useState,
} from "react";
import useAutocomplete from "@mui/base/useAutocomplete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import theme from "theme";
import { Box, Stack } from "@mui/material";
import SelectedCheckboxIcon from "assets/images/SelectedCheckboxIcon";
import UnselectedCheckboxIcon from "assets/images/UnselectedCheckboxIcon";
import { WidthType } from "common";
import TextInput from "./TextInput";
import ResultsList from "./styled/ResultsList";
import NoResultsText from "./styled/NoResultsList";

export interface DropdownMultiSelectProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref" | "value"> {
  readonly disabled?: boolean;
  readonly errorMessage?: string;
  readonly handleChange?: (
    event: SyntheticEvent,
    newValue: ReadonlyArray<string>
  ) => void;
  readonly handleFieldBlur?: (
    event: FocusEvent<HTMLInputElement, Element>
  ) => void;
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
    options,
    placeholder = "Select all that apply",
    value = null,
    handleChange,
    handleFieldBlur,
    ...rest
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

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
    value: value as Array<string>,
    onChange: (event, newValue) => {
      handleChange?.(event, newValue);
    },
    open: isOptionsOpen,
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

  /**
   * This prevents a form submission when input
   * text does not match any options.
   */
  const preventFormSubmit = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && value && inputValue !== value[0])
      event.preventDefault();
  };

  // Helpers for handling dropdown options list for integration of
  // end adornment interactivity
  const toggleOptionsList = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleBlurEvent = (event: FocusEvent<HTMLInputElement, Element>) => {
    handleFieldBlur?.(event);
    setIsOptionsOpen(false);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    // Prevents null TypeError on left arrow "previous" event in useAutocomplete
    if (event.key === "ArrowLeft") event.stopPropagation();

    setIsOptionsOpen(true);
    preventFormSubmit(event);
  };

  return (
    <Box sx={ { position: "relative" } }>
      <div { ...getRootProps() }>
        <Stack direction="row" alignItems="center">
          <TextInput
            ref={ ref }
            { ...rest }
            { ...inputProps }
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
                onClick={ toggleOptionsList }
                sx={ {
                  cursor: "pointer",
                  color: theme.colors.white,
                  transform: popupOpen ? "rotate(-180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease-in",
                } }
              />
            }
            errorMessage={ errorMessage }
            name={ name }
            onBlur={ handleBlurEvent }
            onClick={ toggleOptionsList }
            onKeyDown={ handleKeydown }
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
