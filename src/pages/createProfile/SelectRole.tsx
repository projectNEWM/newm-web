import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { FormikValues, useFormikContext } from "formik";
import { Role, extractProperty, useGetRolesQuery } from "modules/content";

const SelectRole: FunctionComponent = () => {
  const { data: roles = [] } = useGetRolesQuery();
  const { values } = useFormikContext();
  const roleOptions = extractProperty<Role, "name">(roles, "name");

  return (
    <AddProfileInformation
      fieldName="role"
      helperText="Type or select a role"
      placeholder="role"
      prompt={ `What is your main role, ${(values as FormikValues).nickname}?` }
      tags={ roleOptions }
    />
  );
};

export default SelectRole;
