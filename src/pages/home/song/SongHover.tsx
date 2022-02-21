import { CardContent } from "@mui/material";
import soundWave from "assets/svg/sound-wave.svg";

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

        <img alt="img" src={ soundWave } />
      </CardContent>
    </div>
  );
};

export default SongHover;
