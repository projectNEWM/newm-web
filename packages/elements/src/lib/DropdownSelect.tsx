import {
  ForwardRefRenderFunction,
  ForwardedRef,
  KeyboardEvent,
  MouseEventHandler,
  forwardRef,
} from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import theme from "@newm-web/theme";
import { Box } from "@mui/material";
import TextInput from "./TextInput";
import ResultsList from "./styled/ResultsList";
import NoResultsText from "./styled/NoResultsText";
import { DropdownSelectFieldProps } from "./form/DropdownSelectField";

interface DropdownSelectProps extends DropdownSelectFieldProps {
  readonly errorMessage?: string;
  readonly onChangeValue?: (newValue: string) => void;
}

const DropdownSelect: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownSelectProps
> = (
  {
    disabled,
    errorMessage,
    onChangeValue,
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
  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    getPopupIndicatorProps,
    getRootProps,
    groupedOptions,
    popupOpen,
    inputValue,
  } = useAutocomplete({
    clearOnBlur: true,
    getOptionLabel: (option) => option,
    id: name,
    // Removes warning for empty string not being a valid option
    isOptionEqualToValue: (option, value) =>
      value === "" ? true : option === value,
    onChange: (event, newValue) => {
      // Updates as empty string instead of invalid null error for empty field
      // or for partial edit of selected input causing invalid undefined error
      onChangeValue?.(newValue ?? "");
    },
    options,
    value: value as string,
  });

  const hasResults = groupedOptions.length > 0;
  const showNoResults = !hasResults && popupOpen;
  const inputProps = getInputProps();
  const popupIndicatorProps = getPopupIndicatorProps();
  const handleEndAdornmentClick =
    popupIndicatorProps.onClick as MouseEventHandler<HTMLOrSVGElement>;

  /**
   * This prevents a form submission when input text does not match any options.
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
          { ...rest }
          { ...inputProps }
          disabled={ disabled }
          endAdornment={
            <ArrowDropDownIcon
              sx={
                {
                  color: theme.colors.white,
                  cursor: "pointer",
                  transform: popupOpen ? "rotate(-180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease-in",
                } as React.CSSProperties
              }
              onClick={ handleEndAdornmentClick }
            />
          }
          errorMessage={ errorMessage }
          label={ label }
          name={ name }
          placeholder={ placeholder }
          onKeyDown={ preventFormSubmit }
        />
      </div>

      { hasResults && (
        <ResultsList { ...getListboxProps() }>
          { (groupedOptions as typeof options).map((option, index) => (
            <li { ...getOptionProps({ index, option }) } key={ index }>
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
