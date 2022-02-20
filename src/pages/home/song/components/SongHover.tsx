import React from "react"
import { CardContent } from "@mui/material";
import SoundWave from "assets/svg/SoundWave";

interface HoverProps {
  name: string;
  hovering: boolean;
}

const SongHover = (props: HoverProps) => {
  return (
    <div
      style={ {
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: "100px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        height: "100%",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        opacity: props.hovering ? "0.6" : "0",
        textAlign: "center",
      } }
    >
      <CardContent
        sx={ {
          color: "#FFFFFF",
          font: "normal normal 900 14px/18px Raleway",
          letterSpacing: "0px",
          textAlign: "center",
        } }
      >
        <p>{ props.name }</p>

        <SoundWave />
      </CardContent>
    </div>
  );
};

export default SongHover;
