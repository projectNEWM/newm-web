import { Box, InputAdornment, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography } from "elements";
import theme from "theme";
import { Owner } from "modules/song";
import { FunctionComponent } from "react";
import { TextInputField } from "components";

interface OwnersProps {
  readonly owners: ReadonlyArray<Owner>;
  readonly onDelete: (email: string, owners: ReadonlyArray<Owner>) => void;
}

/**
 * Allows for displaying and updating owners when minting a song.
 *
 * TODO - display owners with static text when
 * not editable (https://app.clickup.com/t/8669nr0q7)
 */
const MintSong: FunctionComponent<OwnersProps> = ({ owners, onDelete }) => {
  return (
    <Box>
      { owners.map((owner, idx) => (
        <Stack
          key={ owner.email }
          sx={ {
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 1.5,
          } }
        >
          <Stack>
            <Typography>{ `${owner.firstName} ${owner.lastName}` }</Typography>
            <Typography variant="subtitle1">{ owner.email }</Typography>
          </Stack>

          <Stack flexDirection="row" alignItems="center">
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

            <Button
              color="white"
              sx={ { ml: 3 } }
              variant="outlined"
              width="icon"
              onClick={ () => {
                onDelete(owner.email, owners);
              } }
            >
              <CloseIcon sx={ { color: theme.colors.white } } />
            </Button>
          </Stack>
        </Stack>
      )) }
    </Box>
  );
};

export default MintSong;
