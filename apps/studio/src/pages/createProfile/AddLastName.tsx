import { FunctionComponent } from "react";
import { AddProfileInformation } from "../../components";

const AddLastName: FunctionComponent = () => {
  return (
    <AddProfileInformation
      fieldName="lastName"
      placeholder="Last Name"
      prompt="And your last name?"
    />
  );
};

export default AddLastName;
