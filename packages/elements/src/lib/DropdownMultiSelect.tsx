import {
  FocusEvent,
  ForwardRefRenderFunction,
  ForwardedRef,
  HTMLProps,
  KeyboardEvent,
  MouseEventHandler,
  SyntheticEvent,
  forwardRef,
} from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import theme from "@newm-web/theme";
import { Box, Stack } from "@mui/material";
import { SelectedCheckboxIcon, UnselectedCheckboxIcon } from "@newm-web/assets";
import { WidthType } from "@newm-web/utils";
import TextInput from "./TextInput";
import ResultsList from "./styled/ResultsList";
import NoResultsText from "./styled/NoResultsText";

export interface DropdownMultiSelectProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref" | "value"> {
  readonly disabled?: boolean;
  readonly errorMessage?: string;
  readonly handleBlur?: (event: FocusEvent<HTMLInputElement, Element>) => void;
  readonly handleChange?: (
    event: SyntheticEvent,
    newValue: ReadonlyArray<string>
  ) => void;

  readonly label?: string;
  readonly name: string;
  readonly noResultsText?: string;
  readonly options: ReadonlyArray<string>;
  readonly placeholder?: string;
  readonly tooltipText?: string;
  readonly value?: Array<string>;
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
    handleBlur,
    ...rest
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    getPopupIndicatorProps,
    getRootProps,
    groupedOptions,
    popupOpen,
    inputValue,
    value: selected,
  } = useAutocomplete({
    disableCloseOnSelect: true,
    getOptionLabel: (option) => option,
    id: name,
    multiple: true,
    onChange: (event, newValue) => {
      handleChange?.(event, newValue);
    },
    options,
    value: value as Array<string>,
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
  const popupIndicatorProps = getPopupIndicatorProps();
  const handleEndAdornmentClick =
    popupIndicatorProps.onClick as MouseEventHandler<HTMLOrSVGElement>;

  /**
   * This prevents a form submission when input text does not match any options.
   */
  const preventFormSubmit = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && value && inputValue !== value[0])
      event.preventDefault();
  };

  /**
   * Consolidates onBlur events for Formik Field and MUI's useAutocomplete.
   */
  const handleBlurEvents = (event: FocusEvent<HTMLInputElement, Element>) => {
    handleBlur?.(event);
    inputProps.onBlur?.(event);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    // Prevents null TypeError on left arrow "previous" event in useAutocomplete
    if (event.key === "ArrowLeft") {
      event.stopPropagation();
    }

    preventFormSubmit(event);
  };

  return (
    <Box sx={ { position: "relative" } }>
      <div { ...getRootProps() }>
        <Stack alignItems="center" direction="row">
          <TextInput
            { ...rest }
            { ...inputProps }
            disabled={ disabled }
            endAdornment={
              <ArrowDropDownIcon
                sx={ {
                  color: theme.colors.white,
                  cursor: "pointer",
                  transform: popupOpen ? "rotate(-180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease-in",
                } }
                onClick={ handleEndAdornmentClick }
              />
            }
            errorMessage={ errorMessage }
            label={ label }
            name={ name }
            placeholder={ popupOpen ? "Search" : placeholder }
            style={ {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            } }
            value={ popupOpen ? inputValue : displayValue }
            onBlur={ handleBlurEvents }
            onKeyDown={ handleKeydown }
          />
        </Stack>
      </div>

      { hasResults && (
        <ResultsList { ...getListboxProps() }>
          { (groupedOptions as typeof options).map((option, index) => {
            const isSelected = selected.includes(option);

            return (
              <li { ...getOptionProps({ index, option }) } key={ index }>
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
