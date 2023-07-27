import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { extractProperty } from "common";
import { useFormikContext } from "formik";
import { Role, useGetRolesQuery } from "modules/content";
import { ProfileFormValues } from "modules/session";

const SelectRole: FunctionComponent = () => {
  const { data: roles = [] } = useGetRolesQuery();

  const {
    values: { firstName, nickname },
  } = useFormikContext<ProfileFormValues>();

  const roleOptions = extractProperty<Role, "name">(roles, "name");

  return (
    <AddProfileInformation
      fieldName="role"
      helperText="Type or select a role"
      placeholder="role"
      prompt={ `What's your main role, ${nickname ? nickname : firstName}?` }
      tags={ roleOptions }
    />
  );
};

export default SelectRole;
