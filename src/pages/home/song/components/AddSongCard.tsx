import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Card, IconButton, useTheme } from "@mui/material";
import { History } from "history";

interface AddSongCardProps {
  id: string;
  albumImage: string;
  handleClick: () => void;
  history: History;
}

const AddSongIcon = () => {
  return (
    <svg
      id="Song_Visual"
      data-name="Song Visual"
      xmlns="http://www.w3.org/2000/svg"
      width="250"
      height="250"
      viewBox="0 0 250 250"
    >
      <rect id="Background" width="250" height="250" fill="#0a0a0a" opacity="0.598" />
      <g id="Add_Song" data-name="Add Song" transform="translate(106 106)">
        <rect id="Rectangle_194" data-name="Rectangle 194" width="39" height="39" opacity="0" />
        <g id="Group_362" data-name="Group 362" transform="translate(8.491 6.764)">
          <path
            id="Path_2267"
            data-name="Path 2267"
            d="M27.623,26.519V23.625H26.1v2.894h-3.04v1.447H26.1v2.894h1.52V27.966h3.04V26.519Z"
            transform="translate(-9.063 -12.625)"
            fill="#c3c"
          />
          <path
            id="Icon_ionic-ios-musical-note"
            data-name="Icon ionic-ios-musical-note"
            // eslint-disable-next-line max-len
            d="M25.615,6.389c-.33.063-8.3,1.695-8.592,1.751a.623.623,0,0,0-.57.563h0V23.639a1.939,1.939,0,0,1-.169.823,1.874,1.874,0,0,1-1.132.893c-.232.077-.548.148-.921.232-1.695.38-4.528,1.027-4.528,3.642a3.262,3.262,0,0,0,2.461,3.312,5.282,5.282,0,0,0,.97.07,8.322,8.322,0,0,0,3.6-.928,3.788,3.788,0,0,0,1.695-3.361V12.171a.558.558,0,0,1,.45-.548L25.4,10.287a1.129,1.129,0,0,0,.9-1.1V6.923A.556.556,0,0,0,25.615,6.389Z"
            transform="translate(-9.703 -6.375)"
            fill="none"
            stroke="#c3c"
            strokeWidth="1.2"
          />
        </g>
      </g>
    </svg>
  );
};

const AddSongCard = (props: AddSongCardProps) => {
  const theme = useTheme();
  const { id, handleClick, history } = props;
  const [hovering, setHover] = useState(false);
  return (
    <>
      <Card
        sx={ {
          background: "#0A0A0A 0% 0% no-repeat padding-box;",
          color: "black",
          height: "250px",
          margin: "0px",
          opacity: ".7",
          padding: "0px",
          textAlign: "center",
          width: "250px",
        } }
        onClick={ () => history.push(`/home/song/${id}`) }
      >
        <Box
          onMouseEnter={ () => setHover(true) }
          onMouseLeave={ () => setHover(false) }
          sx={ {
            alignItems: "center",
            display: "flex",
            height: "inherit",
            justifyContent: "center",
          } }
        >
          <IconButton onClick={ handleClick } sx={ { color: theme.palette.primary.main } }>
            { hovering ? <AddIcon sx={ { fontSize: "40px" } } /> : <AddSongIcon /> }
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default AddSongCard;
