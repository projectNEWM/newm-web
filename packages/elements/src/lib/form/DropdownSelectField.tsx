import { ForwardRefRenderFunction, HTMLProps, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import { WidthType } from "@newm-web/utils";
import { SxProps } from "@mui/material";
import DropdownSelect from "../DropdownSelect";

export interface DropdownSelectFieldProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref" | "onChange"> {
  readonly containerSxOverrides?: SxProps;
  readonly disabled?: boolean;
  readonly isOptional?: boolean;
  readonly label?: string;
  readonly name: string;
  readonly noResultsText?: string;
  readonly options: ReadonlyArray<string>;
  readonly placeholder?: string;
  readonly tooltipText?: string;
  readonly widthType?: WidthType;
}

const DropdownSelectField: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownSelectFieldProps
> = (props, ref) => {
  return (
    <Field name={ props.name }>
      { ({ field, form, meta }: FieldProps) => (
        <DropdownSelect
          { ...field }
          { ...props }
          errorMessage={ meta.touched ? meta.error : "" }
          ref={ ref }
          onChange={ (event, newValue) => {
            form.handleChange(props.name)(newValue);
          } }
        />
      ) }
    </Field>
  );
};

export default forwardRef(DropdownSelectField);
