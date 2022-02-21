import { ReactNode } from "react"
import { Card } from "@mui/material";

interface SongCardProps {
  onClick: VoidFunction
  children: ReactNode
}

const SongCard = ({ onClick, children }: SongCardProps) => (
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
    onClick={ onClick }
  >
    {children}
  </Card>
);

export default SongCard;
