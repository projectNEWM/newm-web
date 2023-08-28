import { FunctionComponent, useState } from "react";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { getResizedAlbumCoverImageUrl, useAppDispatch } from "common";
import { PlaySongAdvanced, TableCell, TableHeadCell } from "components";
import theme from "theme";
import {
  Invite,
  convertMillisecondsToSongFormat,
  songApi,
  useGetCollaborationsQuery,
} from "modules/song";

interface InvitesTableProps {
  invites: Invite[];
  disabled?: boolean;
}

const InvitesTable: FunctionComponent<InvitesTableProps> = ({
  invites,
  disabled,
}) => {
  const dispatch = useAppDispatch();
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  const collaborationIds = invites.map(
    ({ collaborationId }) => collaborationId
  );

  const { data: collaborations = [] } = useGetCollaborationsQuery({
    ids: collaborationIds,
  });

  const handleDecline = async (collaborationId: string) => {
    dispatch(
      songApi.endpoints.replyToCollaboration.initiate({
        collaborationId,
        accepted: false,
      })
    );
  };

  const handleAccept = (collaborationId: string) => {
    dispatch(
      songApi.endpoints.replyToCollaboration.initiate({
        collaborationId,
        accepted: true,
      })
    );
  };

  /**
   * An object mapping collaboration IDs to song IDs.
   *
   * @example
   * [{ id: 'collab1', songId: 'song1' }, { id: 'collab2', songId: 'song2' }]
   * the result object will be:
   * { collab1: 'song1', collab2: 'song2' }
   *
   */
  const songIdsByCollaborationId: Record<string, string> =
    collaborations.reduce((acc: { [key: string]: string }, collaboration) => {
      acc[collaboration.id] = collaboration.songId;
      return acc;
    }, {});

  return (
    <TableContainer
      sx={ {
        maxHeight: "65vh",
        backgroundColor: theme.colors.black,
        borderRadius: "8px",
      } }
    >
      <Table size="small" aria-label="Song list">
        <TableHead
          sx={ {
            position: "sticky",
            top: "0",
            backgroundColor: theme.colors.black,
            zIndex: 5,
          } }
        >
          <TableRow>
            <TableHeadCell>SONG NAME</TableHeadCell>
            <TableHeadCell>UPLOADED BY</TableHeadCell>
            <TableHeadCell>YOUR ROLE</TableHeadCell>
            <TableHeadCell>LENGTH</TableHeadCell>
            <TableHeadCell>SHARE</TableHeadCell>
            <TableHeadCell sx={ { textAlign: "end" } }>ACTION</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { invites.map(
            ({
              collaborationId,
              coverArtUrl,
              duration,
              firstName,
              lastName,
              pictureUrl,
              role,
              royaltyRate,
              status,
              title,
            }) => (
              <TableRow key={ collaborationId }>
                <TableCell>
                  <Stack
                    sx={ {
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 1.5,
                      whiteSpace: "nowrap",
                    } }
                  >
                    { coverArtUrl ? (
                      <Stack display="grid">
                        <img
                          style={ {
                            borderRadius: "4px",
                            gridColumnStart: 1,
                            gridRowStart: 1,
                            height: "40px",
                            width: "40px",
                          } }
                          src={ getResizedAlbumCoverImageUrl(coverArtUrl, {
                            width: 50,
                            height: 50,
                          }) }
                          alt="Song cover"
                        />
                        { songIdsByCollaborationId[collaborationId] ? (
                          <PlaySongAdvanced
                            contentSx={ { gridRowStart: 1, gridColumnStart: 1 } }
                            id={ songIdsByCollaborationId[collaborationId] }
                            setPlayingSongId={ setPlayingSongId }
                            playingSongId={ playingSongId }
                          />
                        ) : null }
                      </Stack>
                    ) : (
                      <Stack sx={ { height: "40px", width: "40px" } }></Stack>
                    ) }
                    { title }
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack
                    sx={ {
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 1.5,
                      whiteSpace: "nowrap",
                    } }
                  >
                    { pictureUrl ? (
                      <img
                        style={ {
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                        } }
                        src={ pictureUrl }
                        alt="Profile"
                      />
                    ) : (
                      <Stack sx={ { height: "40px", width: "40px" } }></Stack>
                    ) }
                    { firstName && lastName ? `${firstName} ${lastName}` : null }
                  </Stack>
                </TableCell>
                <TableCell>{ role }</TableCell>
                <TableCell>
                  { duration
                    ? convertMillisecondsToSongFormat(duration)
                    : "--:--" }
                </TableCell>
                <TableCell>{ `${royaltyRate}%` }</TableCell>
                <TableCell>
                  { status === "Waiting" ? (
                    <Stack
                      flexDirection="row"
                      columnGap={ 2 }
                      justifyContent="end"
                    >
                      <IconButton
                        aria-label={ `Decline ${title} song collaboration` }
                        disabled={ disabled }
                        onClick={ () => handleDecline(collaborationId) }
                        sx={ {
                          backgroundColor: theme.colors.red,
                          borderRadius: "8px",
                          "&:hover, &.Mui-disabled": {
                            backgroundColor: theme.colors.red,
                            opacity: 0.9,
                          },
                          "&.Mui-disabled": {
                            opacity: 0.5,
                          },
                        } }
                      >
                        <CloseIcon sx={ { color: theme.colors.white } } />
                      </IconButton>
                      <IconButton
                        aria-label={ `Accept ${title} song collaboration` }
                        disabled={ disabled }
                        onClick={ () => handleAccept(collaborationId) }
                        sx={ {
                          backgroundColor: theme.colors.green,
                          borderRadius: "8px",
                          "&:hover, &.Mui-disabled": {
                            backgroundColor: theme.colors.green,
                            opacity: 0.9,
                          },
                          "&.Mui-disabled": {
                            opacity: 0.5,
                          },
                        } }
                      >
                        <CheckIcon sx={ { color: theme.colors.white } } />
                      </IconButton>
                    </Stack>
                  ) : (
                    status
                  ) }
                </TableCell>
              </TableRow>
            )
          ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvitesTable;
