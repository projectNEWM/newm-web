import { FunctionComponent } from "react";
import { AddProfileInformation } from "@newm.io/studio/components";

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
