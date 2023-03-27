import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { useGetGenresQuery } from "modules/content";

const SelectGenre: FunctionComponent = () => {
  const { data: genres = [] } = useGetGenresQuery();

  return (
    <AddProfileInformation
      fieldName="genre"
      helperText="Type or select a genre"
      placeholder="genre"
      prompt="What's your music genre?"
      tags={ genres }
    />
  );
};

export default SelectGenre;
