import { FunctionComponent } from "react";
import { Stack, Table } from "@mui/material";
import { Button, HorizontalLine, Typography } from "@newm.io/studio/elements";
import { useNavigate } from "react-router-dom";
import theme from "@newm.io/theme";
import TableHead from "./Table/TableHead";

const NoSongsYet: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={ {
        alignItems: "center",
      } }
    >
      <Table>
        <TableHead />
      </Table>
      <Typography variant="subtitle2" sx={ { color: theme.colors.white, mt: [3, 3, 5], mb: 1.5 } }>
        You haven&apos;t uploaded any songs yet!
      </Typography>
      <Button color="music" onClick={ () => navigate("/home/upload-song") } variant="secondary" width="compact">
        Upload your first song
      </Button>

      <HorizontalLine sx={ { mt: [3, 3, 5] } } />
    </Stack>
  );
};

export default NoSongsYet;
