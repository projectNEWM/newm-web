import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import {
  CollaborationStatus,
  useFetchInvitesThunk,
  useGetCollaborationsQuery,
  useGetCollaboratorCountQuery,
} from "modules/song";
import { selectUi, setIsInvitesModalOpen } from "modules/ui";
import { Button, Typography } from "elements";
import { SearchBox } from "components";
import OwnersTable from "./OwnersTable";

const OwnersList: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { isInvitesModalOpen } = useSelector(selectUi);
  const [fetchInvites, { data: invites = [] }] = useFetchInvitesThunk();
  const { data: collaborations = [] } = useGetCollaborationsQuery({
    inbound: true,
    statuses: [CollaborationStatus.Waiting],
  });

  const { data: { count: totalCollaborators = 0 } = {} } =
    useGetCollaboratorCountQuery({
      phrase: query,
      excludeMe: true,
    });

  const handleSearch = (searched: string) => {
    setQuery(searched);
  };

  useEffect(() => {
    fetchInvites();
  }, [fetchInvites, collaborations]);

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

export default OwnersList;
