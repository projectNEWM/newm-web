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
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      flexWrap: "nowrap",
      mx: [null, null, 3],
      pb: 8,
      width: "auto",
    } }
  >
    <Routes>
      <Route element={ <Discography /> } path="/" />
      <Route element={ <EditSong /> } path="edit-song/:songId*" />
      <Route element={ <ViewDetails /> } path="view-details/:songId" />

      <Route element={ <Navigate to="/home/library" replace /> } path="*" />
    </Routes>
  </Container>
);

export default Library;
