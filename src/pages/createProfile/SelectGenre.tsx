import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { extractGenreNames, useGetGenresQuery } from "modules/content";

const SelectGenre: FunctionComponent = () => {
  const { data: genres = [] } = useGetGenresQuery();
  const genreNames = extractGenreNames(genres);

  return (
    <AddProfileInformation
      fieldName="genre"
      helperText="Type or select a genre"
      placeholder="genre"
      prompt="What's your music genre?"
      tags={ genreNames }
    />
  );
};

export default SelectGenre;
