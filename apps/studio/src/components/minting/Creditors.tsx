import { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Stack, useTheme } from "@mui/material";
import { Button, DropdownSelectField, Typography } from "@newm-web/elements";
import Details from "./Details";
import {
  Creditor,
  getCollaboratorInfo,
  getIsCreditorEditable,
  useGetCollaboratorsQuery,
} from "../../modules/song";
import { useGetRolesQuery } from "../../modules/content";

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
  const emails = creditors.map((creditor) => creditor.email);

  const { data: collaborators } = useGetCollaboratorsQuery(
    {
      emails,
    },
    {
      skip: !emails.length,
    }
  );

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
        const isEditable = getIsCreditorEditable(creditor);
        const collaboratorInfo = getCollaboratorInfo(
          creditor.email,
          collaborators
        );

        return (
          <Stack
            key={ creditor.email }
            sx={ {
              alignItems: "center",
              columnGap: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 2,
              rowGap: 2,
            } }
          >
            <Details
              email={ creditor.email }
              firstName={ collaboratorInfo.firstName }
              lastName={ collaboratorInfo.lastName }
              pictureUrl={ collaboratorInfo.pictureUrl }
            />

            <Stack alignItems="center" direction="row">
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
                disabled={ isDeleteDisabled }
                sx={ { ml: [1, 1, 3] } }
                variant="secondary"
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
