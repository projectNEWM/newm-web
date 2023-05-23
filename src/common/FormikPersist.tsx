import { FunctionComponent, useEffect, useRef } from "react";
import { FormikProps, FormikValues, useFormikContext } from "formik";
import debounce from "lodash.debounce";
import isEqual from "react-fast-compare";

export interface PersistProps {
  name: string;
  debounceMs?: number;
  isSessionStorage?: boolean;
}

// Persist data from formik to local/session storage and recall it on mount
export const FormikPersist: FunctionComponent<PersistProps> = ({ name }) => {
  const { values, setValues } = useFormikContext<FormikProps<FormikValues>>();
  const prevFormikValuesRef = useRef<FormikProps<FormikValues>>();

  // Save values to session storage but only every 300ms
  const onSave = debounce((values: FormikProps<FormikValues>) => {
    window.sessionStorage.setItem(name, JSON.stringify(values));
  }, 300);

  // On mount, recall values from session storage
  useEffect(() => {
    const savedForm = window.sessionStorage.getItem(name);

    if (savedForm) {
      const parsedFormValues = JSON.parse(savedForm);
      setValues(parsedFormValues);
      prevFormikValuesRef.current = parsedFormValues;
    }
  }, [name, setValues]);

  // If previous values aren't equal the current values, save the current values
  useEffect(() => {
    if (!isEqual(values, prevFormikValuesRef.current)) {
      onSave(values);
    }

    prevFormikValuesRef.current = values;
  }, [values, onSave]);

  return null;
};

export default FormikPersist;
