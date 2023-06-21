import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { FormikValues, useFormikContext } from "formik";
import { extractRoleNames, useGetRolesQuery } from "modules/content";

const SelectRole: FunctionComponent = () => {
  const { data: roles = [] } = useGetRolesQuery();
  const { values } = useFormikContext();
  const roleNames = extractRoleNames(roles);

  return (
    <AddProfileInformation
      fieldName="role"
      helperText="Type or select a role"
      placeholder="role"
      prompt={ `What is your main role, ${(values as FormikValues).nickname}?` }
      tags={ roleNames }
    />
  );
};

export default SelectRole;
