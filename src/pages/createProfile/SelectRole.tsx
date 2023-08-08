import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { useExtractProperty } from "common";
import { FormikValues, useFormikContext } from "formik";
import { useGetRolesQuery } from "modules/content";

const SelectRole: FunctionComponent = () => {
  const { data: roles = [] } = useGetRolesQuery();
  const { values } = useFormikContext();
  const roleOptions = useExtractProperty(roles, "name");

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
