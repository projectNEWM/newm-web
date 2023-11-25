import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";

const AddFirstName: FunctionComponent = () => {
  return (
    <AddProfileInformation
      fieldName="firstName"
      placeholder="First Name"
      prompt="What's your first name?"
    />
  );
};

export default AddFirstName;
