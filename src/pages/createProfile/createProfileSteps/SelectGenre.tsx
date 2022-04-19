import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { useSelector } from "react-redux";
import { selectGenre } from "modules/genre";

const SelectGenre: FunctionComponent = () => {
  const { genres } = useSelector(selectGenre);

  return (
    <AddProfileInformation
      fieldName="genre"
      nextRoute="/create-profile/complete"
      prompt="What's your music genre?"
      helperText="Type or select a genre"
      tags={ genres }
    />
  );
};

export default SelectGenre;
