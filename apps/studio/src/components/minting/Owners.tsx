import { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import { Box, IconButton, InputAdornment, Stack } from "@mui/material";
import {
  Owner,
  getIsOwnerEditable,
  useGetCollaboratorsQuery,
} from "../../modules/song";
import { Button, Tooltip, Typography } from "@newm-web/elements";
import { TextInputField } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { emptyProfile, useGetProfileQuery } from "../../modules/session";
import Details from "./Details";
import { getCollaboratorInfo } from "../../modules/song";

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
  const emails = owners.map((owner) => owner.email);

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
        <Stack columnGap={1} mt={1.5} flexDirection="row">
          <Typography color="grey100" variant="h5">
            ROYALTY SPLIT HOLDERS
          </Typography>

          <Tooltip
            title={
              "Do you hold the streaming royalty rights to this song? If so, " +
              "what percentage?"
            }
          >
            <IconButton sx={{ padding: 0 }}>
              <HelpIcon
                sx={{
                  color: theme.colors.grey100,
                  height: "18px",
                  width: "18px",
                }}
              />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography color="grey100" variant="h5">
          SPLITS
        </Typography>
      </Stack>

      {owners.map((owner, idx) => {
        const collaboratorInfo = getCollaboratorInfo(
          owner.email,
          collaborators
        );
        const isEditable = getIsOwnerEditable(owner, owners.length);

        return (
          <Stack
            key={owner.email}
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1.5,
              columnGap: 1,
            }}
          >
            <Details
              email={owner.email}
              status={owner.status}
              pictureUrl={collaboratorInfo.pictureUrl}
              firstName={collaboratorInfo.firstName}
              lastName={collaboratorInfo.lastName}
              showStatus={authorEmail !== owner.email}
            />

            <Stack flexDirection="row" alignItems="center">
              {isEditable ? (
                <Stack maxWidth="108px">
                  <TextInputField
                    name={`owners[${idx}].percentage`}
                    aria-label="Ownership percentage"
                    placeholder="%"
                    type="number"
                    endAdornment={
                      <InputAdornment
                        position="start"
                        sx={{
                          color: theme.colors.white,
                          mx: 0.8,
                        }}
                      >
                        <Typography>%</Typography>
                      </InputAdornment>
                    }
                  />
                </Stack>
              ) : (
                <Typography>{owner.percentage}%</Typography>
              )}

              <Button
                color="white"
                sx={{ ml: [1, 1, 3] }}
                variant="secondary"
                width="icon"
                disabled={owner.isCreator || isDeleteDisabled}
                onClick={() => {
                  onDelete(owner, owners);
                }}
              >
                <CloseIcon sx={{ color: theme.colors.white }} />
              </Button>
            </Stack>
          </Stack>
        );
      })}
    </Box>
  );
};

export default Owners;
