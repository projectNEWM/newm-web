import { Box, Stack, useTheme } from "@mui/material";
import { Button, Tooltip, Typography } from "elements";
import {
  Creditor,
  getCollaboratorStatusContent,
  getIsCollaboratorEditable,
} from "modules/song";
import { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DropdownSelectField from "components/form/DropdownSelectField";
import { useGetRolesQuery } from "modules/content";

interface CreditorsProps {
  readonly creditors: ReadonlyArray<Creditor>;
  readonly isDeleteDisabled?: boolean;
  readonly onDelete: (
    creditor: Creditor,
    creditors: ReadonlyArray<Creditor>
  ) => void;
}

/**
 * Allows for displaying and updating creditors when minting a song.
 */
const Creditors: FunctionComponent<CreditorsProps> = ({
  creditors,
  onDelete,
  isDeleteDisabled = false,
}) => {
  const theme = useTheme();
  const { data: roles = [] } = useGetRolesQuery();

  return (
    <Box>
      <Stack flexDirection="row" justifyContent="space-between" mb={ -0.5 }>
        <Typography color="grey100" variant="h5">
          CREDITS TO SHOW ON SONG DETAIL
        </Typography>
        <Typography color="grey100" variant="h5">
          ROLES
        </Typography>
      </Stack>

      { creditors.map((creditor, idx) => {
        const isEditable = getIsCollaboratorEditable(creditor);
        const statusContent = getCollaboratorStatusContent(creditor.status);

        return (
          <Stack
            key={ creditor.email }
            sx={ {
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              mt: 2,
              rowGap: 2,
            } }
          >
            <Stack direction="row" gap={ 1 } alignItems="center">
              { statusContent && (
                <Tooltip title={ statusContent.tooltip }>
                  { statusContent.icon }
                </Tooltip>
              ) }

              <Typography variant="subtitle1">{ creditor.email }</Typography>
            </Stack>

            <Stack direction="row" alignItems="center">
              { isEditable ? (
                <DropdownSelectField
                  isOptional={ false }
                  name={ `creditors[${idx}].role` }
                  options={ roles }
                  placeholder="Select role"
                  widthType="full"
                />
              ) : (
                <Typography color="white" fontWeight={ 500 }>
                  { creditor.role }
                </Typography>
              ) }

              <Button
                color="white"
                sx={ { ml: 3 } }
                variant="secondary"
                disabled={ isDeleteDisabled }
                width="icon"
                onClick={ () => {
                  onDelete(creditor, creditors);
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

export default Creditors;
