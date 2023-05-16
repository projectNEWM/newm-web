import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import {
  selectInvites,
  useFetchInvitesThunk,
  useGetCollaboratorCountQuery,
} from "modules/song";
import { Typography } from "elements";
import { SearchBox } from "components";
import OwnersTable from "./OwnersTable";
import Invitations from "./Invitations";

const Owners: FunctionComponent = () => {
  const [query, setQuery] = useState("");
  const [fetchInvites] = useFetchInvitesThunk();
  const invites = useSelector(selectInvites);

  const { data: { count: totalCollaborators = 0 } = {} } =
    useGetCollaboratorCountQuery({
      phrase: query,
    });

  const handleSearch = (searched: string) => {
    setQuery(searched);
  };

  useEffect(() => {
    fetchInvites();
  }, [fetchInvites]);

  return (
    <>
      <Stack
        sx={ {
          justifyContent: "space-between",
          flexDirection: ["column", "row"],
          rowGap: 2,
          pb: 4,
        } }
      >
        <Typography variant="h3">COLLABORATORS</Typography>
        { invites?.length ? <Invitations /> : null }
      </Stack>

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
