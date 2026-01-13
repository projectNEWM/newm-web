import { FunctionComponent } from "react";
import { Stack, Table, Typography } from "@mui/material";
import { Button, HorizontalLine } from "@newm-web/elements";
import { useNavigate } from "react-router-dom";
import theme from "@newm-web/theme";
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
      <Typography
        sx={ { color: theme.colors.white, mb: 1.5, mt: [3, 3, 5] } }
        variant="subtitle2"
      >
        You haven&apos;t uploaded any songs yet!
      </Typography>
      <Button
        color="music"
        variant="secondary"
        width="compact"
        onClick={ () => navigate("/home/upload-song") }
      >
        Upload your first song
      </Button>

      <HorizontalLine sx={ { mt: [3, 3, 5] } } />
    </Stack>
  );
};

export default NoSongsYet;
