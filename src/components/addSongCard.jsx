import React from "react";
import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CardActions,
  useTheme,
} from "@mui/material";
import { ArtistProfile } from "./ArtistProfile";
import songData from "../mockData";
import AddIcon from "@mui/icons-material/Add";

const AddSongCard = (props) => {
  const theme = useTheme();
  const { id, handleClick, history } = props;

  return (
    <>
      <Card
        sx={{
          height: "250px",
          width: "250px",
          color: "black",
          background: "#0A0A0A 0% 0% no-repeat padding-box;",
          textAlign: "center",
          padding: "0px",
          margin: "0px",

          opacity: ".7",
        }}
        onClick={() => history.push(`/home/song/${id}`)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "inherit",
          }}
        >
          <IconButton onClick={handleClick}>
            <AddIcon
              sx={{ color: theme.palette.primary.main, fontSize: "40px" }}
            />
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default AddSongCard;
