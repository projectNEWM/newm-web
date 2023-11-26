import { FunctionComponent } from 'react';
import { AddProfileInformation } from '@newm.io/studio/components';

const SelectNickname: FunctionComponent = () => {
  return (
    <AddProfileInformation
      fieldName="nickname"
      placeholder="nickname"
      prompt="Do you want to add a stage name?"
      subText="AKA the name your fans know and love."
    />
  );
};

export default SelectNickname;
