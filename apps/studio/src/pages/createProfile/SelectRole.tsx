import { FunctionComponent } from 'react';
import { AddProfileInformation } from '@newm.io/studio/components';
import { useFormikContext } from 'formik';
import { useGetRolesQuery } from '@newm.io/studio/modules/content';
import { ProfileFormValues } from '@newm.io/studio/modules/session';

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
      prompt={`What's your main role, ${nickname ? nickname : firstName}?`}
      tags={roles}
    />
  );
};

export default SelectRole;
