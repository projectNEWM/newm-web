"use client";
import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { HorizontalLine } from "@newm-web/elements";
import { notFound } from "next/navigation";
import { useGetSaleQuery } from "../../../modules/sale";
import MoreSongs from "../../../components/MoreSongs";
import { Sale, SaleMetadata, SimilarSongs } from "../../../components";

interface SingleSongProps {
  readonly params: {
    readonly saleId: string;
  };
}

const SingleSong: FunctionComponent<SingleSongProps> = ({ params }) => {
  const { isLoading, data: sale, error } = useGetSaleQuery(params.saleId);

  // If the sale is not found, redirect to the 404 page, an error toast will display
  if (!isLoading && (!sale || error)) {
    notFound();
  }

  return (
    <Container>
      <Container maxWidth="md" sx={ { flexGrow: 1, mt: [0, 0, 5] } }>
        <Sale isLoading={ isLoading } sale={ sale } />

        <HorizontalLine mt={ 16 } />

        <SaleMetadata sale={ sale } />

        <HorizontalLine />
      </Container>

      <MoreSongs
        artistId={ sale?.song.artistId }
        artistName={ sale?.song.artistName }
        currentSaleId={ sale?.id }
      />

      <SimilarSongs
        currentArtistId={ sale?.song.artistId }
        genres={ sale?.song.genres }
      />
    </Container>
  );
};

export default SingleSong;
