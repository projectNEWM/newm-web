import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { SquareGridCard } from "components";
import PlaylistMedia from "./styled/PlaylistMedia";

interface PlaylistProps {
  id: number;
  title: string;
  imageUrl: string;
  songCount: number;
}

const Playlist: FunctionComponent<PlaylistProps> = ({
  id,
  imageUrl,
}) => {
  const history = useHistory();

  return (
    <SquareGridCard onClick={ () => history.push(`/home/playlist/${id}`) }>
      <PlaylistMedia image={ imageUrl } />
    </SquareGridCard>
  );
};


export default Playlist;
