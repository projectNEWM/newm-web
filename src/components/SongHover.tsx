import { CardContent } from "@mui/material";
import SoundWaveSVG from "./SoundWaveSVG";
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
        opacity: "0.6",
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
        <SoundWaveSVG />
      </CardContent>
    </div>
  );
};

export default SongHover;
