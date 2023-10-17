/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      if (handleChange) {
        handleChange(newValue as string);
        setIsPopupOpen(false);
      }
    },
    options,
    value: value as string,
    open: isPopupOpen,
  });

  const hasResults = groupedOptions.length > 0;
  const showNoResults = !hasResults && popupOpen;

  // A helper to toggle the options list
  const toggleOptionsList = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleCloseOptions = () => {
    setIsPopupOpen(false);
  };

  /**
   * This prevents a form submission when input
   * text does not match any options.
   */
  const preventFormSubmit = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && inputValue !== value) event.preventDefault();
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
          { ...getInputProps() }
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
          onKeyDown={ preventFormSubmit }
          onClick={ () => toggleOptionsList() }
          closeOptionsBox={ handleCloseOptions }
          onKeyDownCapture={ () => {
            !isPopupOpen && setIsPopupOpen(true);
          } }
        />
      </div>

      { hasResults && (
        <ResultsList { ...getListboxProps() }>
          { (groupedOptions as typeof options).map((option, index) => (
            <li
              { ...getOptionProps({ option, index }) }
              key={ index }
              onMouseDown={ () => {
                if (option === value) {
                  setIsPopupOpen(false);
                }
              } }
            >
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
