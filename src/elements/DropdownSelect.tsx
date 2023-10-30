/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  FocusEvent,
  ForwardRefRenderFunction,
  ForwardedRef,
  HTMLProps,
  KeyboardEvent,
  forwardRef,
  useState,
} from "react";
import useAutocomplete from "@mui/base/useAutocomplete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import theme from "theme";
import { Box } from "@mui/material";
import { WidthType } from "common";
import TextInput from "./TextInput";
import ResultsList from "./styled/ResultsList";
import NoResultsText from "./styled/NoResultsList";

export interface DropdownSelectProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref"> {
  readonly disabled?: boolean;
  readonly errorMessage?: string;
  readonly handleBlur?: (event: FocusEvent<HTMLInputElement, Element>) => void;
  readonly handleChange?: (newValue: string) => void;
  readonly label?: string;
  readonly isOptional?: boolean;
  readonly name: string;
  readonly tooltipText?: string;
  readonly noResultsText?: string;
  readonly options: string[];
  readonly placeholder?: string;
  readonly widthType?: WidthType;
}

const DropdownSelect: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownSelectProps
> = (
  {
    disabled,
    errorMessage,
    handleChange,
    handleBlur,
    label,
    name,
    noResultsText = "Nothing found",
    options,
    placeholder,
    value = null,
    widthType,
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
  } = useAutocomplete({
    id: name,
    getOptionLabel: (option) => option,
    onChange: (event, newValue) => {
      // Updates as empty string instead of invalid null error for empty field
      // or for partial edit of selected input causing invalid undefined error
      if (newValue === null || newValue === undefined) handleChange?.("");
      else handleChange?.(newValue as string);

      setIsOptionsOpen(false);
    },
    // Removes warning for empty string not being a valid option
    isOptionEqualToValue: (option, value) =>
      value === "" ? true : option === value,
    clearOnBlur: true,
    options,
    value: value as string,
    open: isOptionsOpen,
  });

  const hasResults = groupedOptions.length > 0;
  const showNoResults = !hasResults && popupOpen;
  const inputProps = getInputProps();

  /**
   * This prevents a form submission when input text does not match any options.
   */
  const preventFormSubmit = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && inputValue !== value) event.preventDefault();
  };

  /**
   *  Dropdown options toggle to handle separate end adornment interactivity
   */
  const toggleOptionsList = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  /**
   * Consolidates onBlur events for Formik Field and MUI's useAutocomplete,
   * and sets dropdown options to close on blur.
   */
  const handleBlurEvents = (event: FocusEvent<HTMLInputElement, Element>) => {
    handleBlur?.(event);
    inputProps.onBlur?.(event);
    setIsOptionsOpen(false);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    // Replaces useAutocomplete key actions
    switch (event.key) {
      case "ArrowLeft": {
        break;
      }
      case "ArrowRight": {
        break;
      }
      case "Escape": {
        setIsOptionsOpen(false);
        break;
      }
      default: {
        setIsOptionsOpen(true);
        break;
      }
    }

    preventFormSubmit(event);
  };

  return (
    <Box
      sx={ {
        maxWidth: widthType === "default" ? theme.inputField.maxWidth : null,
        position: "relative",
        width: "100%",
      } }
    >
      <div { ...getRootProps() }>
        <TextInput
          ref={ ref }
          { ...rest }
          { ...inputProps }
          disabled={ disabled }
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
          label={ label }
          name={ name }
          placeholder={ placeholder }
          onBlur={ handleBlurEvents }
          onClick={ toggleOptionsList }
          onKeyDown={ handleKeydown }
        />
      </div>

      { hasResults && (
        <ResultsList { ...getListboxProps() }>
          { (groupedOptions as typeof options).map((option, index) => (
            <li { ...getOptionProps({ option, index }) } key={ index }>
              { option }
            </li>
          )) }
        </ResultsList>
      ) }

      { showNoResults ? <NoResultsText>{ noResultsText }</NoResultsText> : null }
    </Box>
  );
};

export default forwardRef(DropdownSelect);
