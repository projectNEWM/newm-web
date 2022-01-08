import React from "react";
import { useState } from "react";
import { Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { ArtistProfile } from "./ArtistProfile";
import songData from "../data/SongData";

const Song = (props) => {
  const { id, songId, name, album_image, history } = props;

  return (
    <>
      <Card
        sx={{
          height: "250px",
          width: "250px",
          color: "black",
          background: "#0A0A0A 0% 0% no-repeat padding-box;",
          textAlign: "center",
          padding:"0px",
          margin:"0px",

          opacity: ".7",
        }}
        onClick={() => history.push(`/home/song/${id}`)}
      >
        <CardMedia
          image={album_image}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "100px",
            margin: "auto",
            marginTop: "25px",
          }}
        />
        <CardContent>{name}</CardContent>
      </Card>
    </>
  );
};

export default Song;
