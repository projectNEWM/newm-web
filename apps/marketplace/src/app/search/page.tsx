"use client";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { SaleSearchResults } from "../../components";

const Search = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  if (!searchTerm) {
    throw new Error("No search term present");

    return null;
  }

  return (
    <Container sx={ { flexGrow: 1, mt: 5 } }>
      <SaleSearchResults query={ searchTerm } />
    </Container>
  );
};

export default Search;
