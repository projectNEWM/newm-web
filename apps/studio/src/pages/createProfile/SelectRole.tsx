import { FunctionComponent } from "react";
import { useFormikContext } from "formik";
import { AddProfileInformation } from "../../components";
import { useGetRolesQuery } from "../../modules/content";
import { ProfileFormValues } from "../../modules/session";

const SelectRole: FunctionComponent = () => {
  const { data: roles = [] } = useGetRolesQuery();

  const {
    values: { firstName, nickname },
  } = useFormikContext<ProfileFormValues>();

  return (
    <AddProfileInformation
      fieldName="role"
      helperText="Type or select a role"
      placeholder="role"
      prompt={ `What's your main role, ${nickname ? nickname : firstName}?` }
      tags={ roles }
    />
  );
};

export default SelectRole;
