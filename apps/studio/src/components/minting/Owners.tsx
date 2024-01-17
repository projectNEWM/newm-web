import { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import { Box, IconButton, InputAdornment, Stack } from "@mui/material";
import {
  Button,
  TextInputField,
  Tooltip,
  Typography,
} from "@newm-web/elements";
import theme from "@newm-web/theme";
import Details from "./Details";
import { emptyProfile, useGetProfileQuery } from "../../modules/session";
import {
  CollaborationStatus,
  Owner,
  getCollaboratorInfo,
  getIsOwnerEditable,
  useGetCollaboratorsQuery,
} from "../../modules/song";

interface OwnersProps {
  readonly isDeleteDisabled?: boolean;
  readonly onDelete: (owner: Owner, owners: ReadonlyArray<Owner>) => void;
  readonly owners: ReadonlyArray<Owner>;
}

/**
 * Allows for displaying and updating owners when minting a song.
 */
const Owners: FunctionComponent<OwnersProps> = ({
  owners,
  onDelete,
  isDeleteDisabled = false,
}) => {
  const emails = owners.map((owner) => owner.email);
  const hasSomeoneRejected = owners.some(
    (owner) => owner.status === CollaborationStatus.Rejected
  );

  const { data: collaborators } = useGetCollaboratorsQuery(
    {
      emails,
    },
    {
      skip: !emails.length,
    }
  );

  const { data: { email: authorEmail } = emptyProfile } = useGetProfileQuery();

  return (
    <Box>
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack columnGap={ 1 } flexDirection="row" mt={ 1.5 }>
          <Typography color="grey100" variant="h5">
            ROYALTY SPLIT HOLDERS
          </Typography>

          <Tooltip
            title={
              "Do you hold the streaming royalty rights to this song? If so, " +
              "what percentage?"
            }
          >
            <IconButton sx={ { padding: 0 } }>
              <HelpIcon
                sx={ {
                  color: theme.colors.grey100,
                  height: "18px",
                  width: "18px",
                } }
              />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography color="grey100" variant="h5">
          SPLITS
        </Typography>
      </Stack>

      { owners.map((owner, idx) => {
        const collaboratorInfo = getCollaboratorInfo(
          owner.email,
          collaborators
        );
        const isEditable = getIsOwnerEditable(owner, hasSomeoneRejected);

        return (
          <Stack
            key={ owner.email }
            sx={ {
              alignItems: "center",
              columnGap: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 1.5,
            } }
          >
            <Details
              email={ owner.email }
              firstName={ collaboratorInfo.firstName }
              lastName={ collaboratorInfo.lastName }
              pictureUrl={ collaboratorInfo.pictureUrl }
              showStatus={ authorEmail !== owner.email }
              status={ owner.status }
            />

            <Stack alignItems="center" flexDirection="row">
              { isEditable ? (
                <Stack maxWidth="108px">
                  <TextInputField
                    aria-label="Ownership percentage"
                    endAdornment={
                      <InputAdornment
                        position="start"
                        sx={ {
                          color: theme.colors.white,
                          mx: 0.8,
                        } }
                      >
                        <Typography>%</Typography>
                      </InputAdornment>
                    }
                    name={ `owners[${idx}].percentage` }
                    placeholder="%"
                    type="number"
                  />
                </Stack>
              ) : (
                <Typography>{ owner.percentage }%</Typography>
              ) }

              <Button
                color="white"
                disabled={ owner.isCreator || isDeleteDisabled }
                sx={ { ml: [1, 1, 3] } }
                variant="secondary"
                width="icon"
                onClick={ () => {
                  onDelete(owner, owners);
                } }
              >
                <CloseIcon sx={ { color: theme.colors.white } } />
              </Button>
            </Stack>
          </Stack>
        );
      }) }
    </Box>
  );
};

export default Owners;
