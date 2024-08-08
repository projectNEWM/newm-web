import { FunctionComponent, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import OwnersTable from "./OwnersTable";
import {
  CollaborationStatus,
  useFetchInvitesThunk,
  useGetCollaborationsQuery,
  useGetCollaboratorCountQuery,
} from "../../../modules/song";
import { selectUi, setIsInvitesModalOpen } from "../../../modules/ui";
import { SearchBox } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../common";

const OwnersList: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const { isInvitesModalOpen } = useAppSelector(selectUi);
  const [fetchInvites, { data: invites = [] }] = useFetchInvitesThunk();
  const { data: collaborations = [] } = useGetCollaborationsQuery({
    inbound: true,
    statuses: [CollaborationStatus.Waiting],
  });

  const { data: { count: totalCollaborators = 0 } = {} } =
    useGetCollaboratorCountQuery({
      excludeMe: true,
      phrase: query,
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
          flexDirection: ["column", "row"],
          justifyContent: "space-between",
          pb: 4,
          rowGap: 2,
        } }
      >
        <Typography variant="h3">COLLABORATORS</Typography>
        { !!invites?.length && (
          <Button
            width="compact"
            onClick={ () => dispatch(setIsInvitesModalOpen(!isInvitesModalOpen)) }
          >
            Invitation pending
          </Button>
        ) }
      </Stack>

      { totalCollaborators || query ? (
        <SearchBox
          placeholder="Search by name or email"
          query={ query }
          onSearch={ handleSearch }
        />
      ) : null }

      <OwnersTable query={ query } totalCollaborators={ totalCollaborators } />
    </>
  );
};

export default OwnersList;
