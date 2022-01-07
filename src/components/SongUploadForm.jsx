import { Grid, Typography, Paper, Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import TextInput from "./TextInput";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "grey",
}));

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
    </React.Fragment>
  );
}

export default function SongUploadForm(props) {
  return (
    <Box sx={{ flexGrow: 1 }} height="522px" width="1062px">
      <Grid direction="row" container spacing={1}>
        <Grid item xs={4}>
          <Typography variant="formHeader">Add Your Next Big Hit</Typography>
          <Grid direction="column" container spacing={1}>
            <Grid item>
              <TextInput />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid direction="column" container spacing={1}>
            <Grid item>
              <Item>Item</Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid direction="column" container spacing={1}>
            <Grid item>
              <Item>Item</Item>
            </Grid>
            <Grid item>
              <Item>Item</Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
