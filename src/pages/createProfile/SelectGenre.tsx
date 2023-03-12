import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { useGetSongGenresQuery } from "modules/song";

const SelectGenre: FunctionComponent = () => {
  const { data = [] } = useGetSongGenresQuery();
  const genres = data.filter((genre: string) => genre.length > 0);

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
