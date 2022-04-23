import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";

const SelectNickname: FunctionComponent = () => {
  return (
    <AddProfileInformation
      fieldName="nickname"
      prompt="What should we call you?"
    />
  );
};

export default SelectNickname;
