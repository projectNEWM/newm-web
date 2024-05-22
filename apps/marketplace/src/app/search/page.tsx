"use client";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { SearchResults } from "../../components";

const Search = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  return (
    <Container sx={ { flexGrow: 1, mt: 5 } }>
      <SearchResults query={ searchTerm } />
    </Container>
  );
};

export default Search;
