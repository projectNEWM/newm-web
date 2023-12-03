import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EditSong from "./EditSong";
import Discography from "./Discography";
import ViewDetails from "./ViewDetails";

const Library: FunctionComponent = () => (
  <Container
    maxWidth={ false }
    sx={ {
      mx: [null, null, 3],
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      flexWrap: "nowrap",
      width: "auto",
      pb: 8,
    } }
  >
    <Routes>
      <Route path="/" element={ <Discography /> } />
      <Route path="edit-song/:songId*" element={ <EditSong /> } />
      <Route path="view-details/:songId" element={ <ViewDetails /> } />

      <Route path="*" element={ <Navigate to="/home/library" replace /> } />
    </Routes>
  </Container>
);

export default Library;
