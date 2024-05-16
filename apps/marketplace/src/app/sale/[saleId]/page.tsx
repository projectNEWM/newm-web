"use client";
import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { HorizontalLine } from "@newm-web/elements";
import { useRouter } from "next/navigation";
import { useGetSaleQuery } from "../../../modules/sale";
import MoreSongs from "../../../components/MoreSongs";
import { Sale, SaleMetadata, SimilarSongs } from "../../../components";

interface SingleSongProps {
  readonly params: {
    readonly saleId: string;
  };
}

const SingleSong: FunctionComponent<SingleSongProps> = ({ params }) => {
  const router = useRouter();
  const { isLoading, data: sale } = useGetSaleQuery(params.saleId);

  // If the sale is not found, redirect to the home page, an error toast will display
  // TODO: render 404 or error page
  if (!isLoading && !sale) {
    router.push("/");

    return null;
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

      <SimilarSongs currentSaleId={ sale?.id } genres={ sale?.song.genres } />
    </Container>
  );
};

export default SingleSong;
