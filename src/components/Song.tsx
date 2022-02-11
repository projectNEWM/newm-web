import { Card, CardContent, CardMedia } from "@mui/material";
import { History } from "history";
import { useState } from "react";
import SoundWaveSVG from "./SoundWaveSVG";

interface SongProps {
  songId: number;
  name: string;
  album_image: string;
  history: History;
}

export const Song = (props: SongProps) => {
  const { songId, name, album_image, history } = props;
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
        onClick={ () => history.push(`/home/song/${songId}`) }
      >
        <CardMedia
          image={ album_image }
          onMouseEnter={ () => setHover(true) }
          onMouseLeave={ () => setHover(false) }
          style={ {
            borderRadius: "100px",
            height: "200px",
            margin: "auto",
            marginTop: "25px",
            opacity: "1",
            width: "200px",
          } }
        >
          { hovering && (
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
                  opacity: 1,
                  textAlign: "center",
                } }
              >
                <p>{ name }</p>
                <SoundWaveSVG />
              </CardContent>
            </div>
          ) }
        </CardMedia>
      </Card>
    </>
  );
};
