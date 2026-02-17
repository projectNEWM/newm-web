import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Owner from "./Owner";
import OwnersList from "./OwnersList";
import NotFoundPage from "../../NotFoundPage";

const Owners: FunctionComponent = () => (
  <Container
    maxWidth={ false }
    sx={ {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      flexWrap: "nowrap",
      marginTop: 10.5,
      mx: [null, null, 3],
      paddingBottom: 8,
      width: "auto",
    } }
  >
    <Routes>
      <Route element={ <OwnersList /> } path="/" />
      <Route element={ <Owner /> } path="/:userId" />

      <Route
        element={ <NotFoundPage redirectUrl="/home/collaborators" /> }
        path="*"
      />
    </Routes>
  </Container>
);
export default Owners;
