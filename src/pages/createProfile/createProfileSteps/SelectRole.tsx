import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { useSelector } from "react-redux";
import { FormikValues, useFormikContext } from "formik";
import { selectContent } from "modules/content";

const SelectRole: FunctionComponent = () => {
  const { roles } = useSelector(selectContent);
  const { values } = useFormikContext();

  return (
    <AddProfileInformation
      fieldName="role"
      helperText="Type or select a role"
      placeholder="role"
      prompt={ `What is your main role, ${(values as FormikValues).nickname}?` }
      tags={ roles }
    />
  );
};

export default SelectRole;
