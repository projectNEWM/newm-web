import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { useSelector } from "react-redux";
import { selectContent } from "modules/content";

const SelectRole: FunctionComponent = () => {
  const { roles } = useSelector(selectContent);

  return (
    <AddProfileInformation
      fieldName="role"
      prompt="What is your main role?"
      helperText="Type or select a role"
      tags={ roles }
    />
  );
};

export default SelectRole;
