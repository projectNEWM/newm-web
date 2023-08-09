import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { useExtractProperty } from "common";
import { useFormikContext } from "formik";
import { useGetRolesQuery } from "modules/content";
import { ProfileFormValues } from "modules/session";

const SelectRole: FunctionComponent = () => {
  const { data: roles = [] } = useGetRolesQuery();

  const {
    values: { firstName, nickname },
  } = useFormikContext<ProfileFormValues>();

  const roleOptions = useExtractProperty(roles, "name");

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
