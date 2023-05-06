import { FunctionComponent, useState } from "react";
import { useGetCollaboratorCountQuery } from "modules/song";
import { Typography } from "elements";
import { SearchBox } from "components";
import OwnersTable from "./OwnersTable";

const Owners: FunctionComponent = () => {
  const [query, setQuery] = useState("");

  const { data: { count: totalCollaborators = 0 } = {} } =
    useGetCollaboratorCountQuery({
      phrase: query,
    });

  const handleSearch = (searched: string) => {
    setQuery(searched);
  };

  return (
    <>
      <Typography sx={ { pb: 4 } } variant="h3">
        COLLABORATORS
      </Typography>

      { totalCollaborators || query ? (
        <SearchBox
          placeholder="Search by name or email"
          query={ query }
          onSearch={ handleSearch }
        />
      ) : null }

      <OwnersTable totalCollaborators={ totalCollaborators } query={ query } />
    </>
  );
};

export default Owners;
