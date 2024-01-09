import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Owner from "./Owner";
import OwnersList from "./OwnersList";

const Owners: FunctionComponent = () => (
  <Container
    maxWidth={ false }
    sx={ {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      flexWrap: "nowrap",
      mx: [null, null, 3],
      paddingBottom: 8,
      width: "auto",
    } }
  >
    <Routes>
      <Route element={ <OwnersList /> } path="/" />
      <Route element={ <Owner /> } path="/:userId" />

      <Route element={ <Navigate to="/home/collaborators" replace /> } path="*" />
    </Routes>
  </Container>
);
export default Owners;
