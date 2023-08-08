import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EditSong from "./EditSong";
import Discography from "./Discography";

const Library: FunctionComponent = () => (
  <Container
    maxWidth={ false }
    sx={ {
      marginX: [null, null, 3],
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      flexWrap: "nowrap",
      width: "auto",
    } }
  >
    <Routes>
      <Route path="/" element={ <Discography /> } />
      <Route path="edit-song/:songId*" element={ <EditSong /> } />

      <Route path="*" element={ <Navigate to="/home/library" replace /> } />
    </Routes>
  </Container>
);

export default Library;
