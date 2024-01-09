let id = 0;
function createData(
  song_name: string,
  song_cover_art: string,
  royalties_accrued: number
) {
  id = id + 1;
  return { id, royalties_accrued, song_cover_art, song_name };
}
export interface Royalties {
  id: number;
  royalties_accrued: number;
  song_cover_art: string;
  song_name: string;
}
export interface RoyaltiesResponse {
  data: Royalties[];
  isLoading: boolean;
  isSuccess: boolean;
}

const mockRoyalties: RoyaltiesResponse = {
  data: [
    createData(
      "Once upon a time",
      "https://www.graphicdesignforum.com/uploads/default/original/2X/d/d3c4e744046205a49d06beb874df3b39da7c9c73.jpeg",
      3.34
    ),
  ],
  isLoading: false,
  isSuccess: true,
};

export default mockRoyalties;
