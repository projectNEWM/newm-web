import { Card, CardContent, CardMedia } from "@mui/material";
import { History } from "history";

interface SongProps {
  songId: number;
  name: string;
  album_image: string;
  history: History;
}

export const Song = (props: SongProps) => {
  const { songId, name, album_image, history } = props;

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
          style={ {
            borderRadius: "100px",
            height: "200px",
            margin: "auto",
            marginTop: "25px",
            width: "200px",
          } }
        />
        <CardContent>{ name }</CardContent>
      </Card>
    </>
  );
};
