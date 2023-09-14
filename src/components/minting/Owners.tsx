import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
} from "@mui/material";
import { Button, Tooltip, Typography } from "elements";
import {
  MintingStatus,
  Owner,
  getCollaboratorStatusContent,
  getIsOwnerEditable,
} from "modules/song";
import { FunctionComponent } from "react";
import { TextInputField } from "components";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";

interface OwnersProps {
  readonly owners: ReadonlyArray<Owner>;
  readonly songMintingStatus: MintingStatus;
  readonly isDeleteDisabled?: boolean;
  readonly onDelete: (owner: Owner, owners: ReadonlyArray<Owner>) => void;
}

/**
 * Allows for displaying and updating owners when minting a song.
 */
const Owners: FunctionComponent<OwnersProps> = ({
  owners,
  onDelete,
  songMintingStatus,
  isDeleteDisabled = false,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack columnGap={ 1 } mt={ 1.5 } flexDirection="row">
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
        const isEditable = getIsOwnerEditable(
          songMintingStatus,
          owner,
          owners.length
        );
        const statusContent = getCollaboratorStatusContent(owner.status);

        return (
          <Stack
            key={ owner.email }
            sx={ {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1.5,
            } }
          >
            <Stack direction="row" gap={ 1 } alignItems="center">
              { statusContent && (
                <Tooltip title={ statusContent.tooltip }>
                  { statusContent.icon }
                </Tooltip>
              ) }

              <Typography variant="subtitle1">{ owner.email }</Typography>
            </Stack>

            <Stack flexDirection="row" alignItems="center">
              { isEditable ? (
                <Stack maxWidth="108px">
                  <TextInputField
                    name={ `owners[${idx}].percentage` }
                    aria-label="Ownership percentage"
                    placeholder="%"
                    type="number"
                    endAdornment={
                      <InputAdornment
                        position="start"
                        sx={ {
                          color: theme.colors.white,
                          mr: 1,
                        } }
                      >
                        <Typography>%</Typography>
                      </InputAdornment>
                    }
                  />
                </Stack>
              ) : (
                <Typography>{ owner.percentage }%</Typography>
              ) }

              <Button
                color="white"
                sx={ { ml: 3 } }
                variant="secondary"
                width="icon"
                disabled={ owner.isCreator || isDeleteDisabled }
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
