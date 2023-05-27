import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Owner from "./Owner";
import OwnersList from "./OwnersList";

const Owners: FunctionComponent = () => (
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
      <Route path="/" element={ <OwnersList /> } />
      <Route path="/:userId" element={ <Owner /> } />

      <Route path="*" element={ <Navigate to="/home/collaborators" replace /> } />
    </Routes>
  </Container>
);

export default Owners;
