import { Box, InputAdornment, Stack, useTheme } from "@mui/material";
import { Button, Tooltip, Typography } from "elements";
import { CollaborationStatus, Owner } from "modules/song";
import { FunctionComponent, ReactElement } from "react";
import { TextInputField } from "components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";

interface OwnersProps {
  readonly owners: ReadonlyArray<Owner>;
  readonly onDelete: (owner: Owner, owners: ReadonlyArray<Owner>) => void;
}

interface StatusContent {
  readonly tooltip: string;
  readonly icon: ReactElement;
}

/**
 * Allows for displaying and updating owners when minting a song.
 *
 * TODO - display owners with static text when
 * not editable (https://app.clickup.com/t/8669nr0q7)
 */
const Owners: FunctionComponent<OwnersProps> = ({ owners, onDelete }) => {
  const theme = useTheme();

  const statusContentMap: Record<string, StatusContent> = {
    [CollaborationStatus.Waiting]: {
      tooltip: "Waiting on acceptance from collaborator.",
      icon: <AccessTimeIcon style={ { color: theme.colors.yellow } } />,
    },
    [CollaborationStatus.Rejected]: {
      tooltip: "Collaborator rejected the proposed ownership amount.",
      icon: <CloseIcon style={ { color: theme.colors.red } } />,
    },
  };

  return (
    <Box>
      { owners.map((owner, idx) => {
        const statusContent = statusContentMap[owner.status];

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
              { owner.status === CollaborationStatus.Editing ? (
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
                disabled={ owner.isCreator }
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
