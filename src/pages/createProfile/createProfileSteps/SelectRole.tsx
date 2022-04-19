import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { useSelector } from "react-redux";
import { selectRole } from "modules/role";

const SelectRole: FunctionComponent = () => {
  const { roles } = useSelector(selectRole);

  return (
    <AddProfileInformation
      fieldName="role"
      prompt="What is your main role?"
      nextRoute="/create-profile/what-is-your-genre"
      helperText="Type or select a role"
      tags={ roles }
    />
  );
};

export default SelectRole;
