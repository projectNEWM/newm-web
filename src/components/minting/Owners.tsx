import { Box, InputAdornment, Stack, useTheme } from "@mui/material";
import { Button, Tooltip, Typography } from "elements";
import {
  Owner,
  getCollaboratorStatusContent,
  getIsCollaboratorEditable,
} from "modules/song";
import { FunctionComponent } from "react";
import { TextInputField } from "components";
import CloseIcon from "@mui/icons-material/Close";

interface OwnersProps {
  readonly owners: ReadonlyArray<Owner>;
  readonly isDeleteDisabled?: boolean;
  readonly onDelete: (owner: Owner, owners: ReadonlyArray<Owner>) => void;
}

/**
 * Allows for displaying and updating owners when minting a song.
 */
const Owners: FunctionComponent<OwnersProps> = ({
  owners,
  onDelete,
  isDeleteDisabled = false,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography color="grey100" variant="h5">
          MASTER OWNERS
        </Typography>
        <Typography color="grey100" variant="h5">
          SHARES
        </Typography>
      </Stack>

      { owners.map((owner, idx) => {
        const isEditable = getIsCollaboratorEditable(owner);
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
                <TextInputField
                  name={ `owners[${idx}].percentage` }
                  aria-label="Ownership percentage"
                  max={ 100 }
                  min={ 0 }
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
