import { FunctionComponent } from "react";
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
import {
  convertMillisecondsToSongFormat,
  getResizedAlbumCoverImageUrl,
} from "common";
import { TableCell, TableHeadCell } from "components";
import theme from "theme";
import { Invite, songApi } from "modules/song";
import { useDispatch } from "react-redux";

interface InvitesTableProps {
  invites: Invite[];
}

const InvitesTable: FunctionComponent<InvitesTableProps> = ({ invites }) => {
  const dispatch = useDispatch();

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
            <TableHeadCell sx={ { textAlign: "end" } }>LENGTH</TableHeadCell>
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
                      <img
                        style={ {
                          borderRadius: "4px",
                          width: "40px",
                          height: "40px",
                        } }
                        src={ getResizedAlbumCoverImageUrl(coverArtUrl, {
                          width: 50,
                          height: 50,
                        }) }
                        alt="Song cover"
                      />
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
                <TableCell sx={ { textAlign: "end" } }>
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
                        onClick={ () => handleDecline(collaborationId) }
                        sx={ {
                          backgroundColor: theme.colors.red,
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: theme.colors.red,
                            opacity: 0.9,
                          },
                        } }
                      >
                        <CloseIcon sx={ { color: theme.colors.white } } />
                      </IconButton>
                      <IconButton
                        aria-label={ `Accept ${title} song collaboration` }
                        onClick={ () => handleAccept(collaborationId) }
                        sx={ {
                          backgroundColor: theme.colors.green,
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: theme.colors.green,
                            opacity: 0.9,
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
