import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import {
  selectInvites,
  useFetchInvitesThunk,
  useGetCollaboratorCountQuery,
} from "modules/song";
import { selectUi, setIsInvitesModalOpen } from "modules/ui";
import { Button, Typography } from "elements";
import { SearchBox } from "components";
import OwnersTable from "./OwnersTable";

const Owners: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [fetchInvites] = useFetchInvitesThunk();
  const invites = useSelector(selectInvites);
  const { isInvitesModalOpen } = useSelector(selectUi);

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
        { invites?.length ? (
          <Button
            onClick={ () => dispatch(setIsInvitesModalOpen(!isInvitesModalOpen)) }
            width="compact"
          >
            Invitation pending
          </Button>
        ) : null }
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
