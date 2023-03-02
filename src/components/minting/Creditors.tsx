import { Box, Stack, useTheme } from "@mui/material";
import { Button, Typography } from "elements";
import { Creditor } from "modules/song";
import { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface CreditorsProps {
  readonly creditors: ReadonlyArray<Creditor>;
  readonly onDelete: (
    email: string,
    creditors: ReadonlyArray<Creditor>
  ) => void;
}

const Creditors: FunctionComponent<CreditorsProps> = ({
  creditors,
  onDelete,
}) => {
  const theme = useTheme();

  return (
    <Box>
      { creditors.map((creditor) => (
        <Stack
          key={ creditor.email }
          sx={ {
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
          } }
        >
          <Stack>
            <Typography>{ `${creditor.firstName} ${creditor.lastName}` }</Typography>
            <Typography variant="subtitle1">{ creditor.email }</Typography>
          </Stack>

          <Button
            color="white"
            sx={ { ml: 3 } }
            variant="outlined"
            width="icon"
            onClick={ () => {
              onDelete(creditor.email, creditors);
            } }
          >
            <CloseIcon sx={ { color: theme.colors.white } } />
          </Button>
        </Stack>
      )) }
    </Box>
  );
};

export default Creditors;
