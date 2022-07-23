let id = 0;
function createData(
  songName: string,
  songCoverArt: string,
  royaltiesAccrued: number
) {
  id = id + 1;
  return { id, songName, songCoverArt, royaltiesAccrued };
}
export interface SongRoyalties {
  id: number;
  songName: string;
  songCoverArt: string;
  royaltiesAccrued: number;
}
export interface SongRoyaltiesResponse {
  data: SongRoyalties[];
  isLoading: boolean;
  isSuccess: boolean;
}

export const mockSongRoyalties: SongRoyaltiesResponse = {
  data: [
    createData(
      "Once upon a time",
      "https://www.graphicdesignforum.com/uploads/default/original/2X/d/d3c4e744046205a49d06beb874df3b39da7c9c73.jpeg",
      3.34
    ),
    createData(
      "Fall upon you",
      "https://media.pitchfork.com/photos/5929b628b1335d7bf169a9fa/1:1/w_600/2c34c1fc.jpg",
      0.67
    ),
    createData(
      "Regalo Live",
      "https://thesagenews.com/wp-content/uploads/2018/03/IMG_4584-900x900.jpg",
      2.63
    ),
    createData(
      "Who are you?",
      "https://m.media-amazon.com/images/I/61R58SHW+GL._SL1500_.jpg",
      2.63
    ),
    createData(
      "Tequila Shots",
      "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      2.63
    ),
    createData(
      "Once upon a time",
      "https://www.graphicdesignforum.com/uploads/default/original/2X/d/d3c4e744046205a49d06beb874df3b39da7c9c73.jpeg",
      3.34
    ),
    createData(
      "Fall upon you",
      "https://media.pitchfork.com/photos/5929b628b1335d7bf169a9fa/1:1/w_600/2c34c1fc.jpg",
      0.67
    ),
    createData(
      "Regalo Live",
      "https://thesagenews.com/wp-content/uploads/2018/03/IMG_4584-900x900.jpg",
      2.63
    ),
    createData(
      "Tequila Shots",
      "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      2.63
    ),
    createData(
      "Who are you?",
      "https://m.media-amazon.com/images/I/61R58SHW+GL._SL1500_.jpg",
      2.63
    ),
    createData(
      "Tequila Shots",
      "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      2.63
    ),
    createData(
      "Once upon a time",
      "https://www.graphicdesignforum.com/uploads/default/original/2X/d/d3c4e744046205a49d06beb874df3b39da7c9c73.jpeg",
      3.34
    ),
    createData(
      "Fall upon you",
      "https://media.pitchfork.com/photos/5929b628b1335d7bf169a9fa/1:1/w_600/2c34c1fc.jpg",
      0.67
    ),
    createData(
      "Regalo Live",
      "https://thesagenews.com/wp-content/uploads/2018/03/IMG_4584-900x900.jpg",
      2.63
    ),
    createData(
      "Who are you?",
      "https://m.media-amazon.com/images/I/61R58SHW+GL._SL1500_.jpg",
      2.63
    ),
    createData(
      "Tequila Shots",
      "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      2.63
    ),
    createData(
      "Once upon a time",
      "https://www.graphicdesignforum.com/uploads/default/original/2X/d/d3c4e744046205a49d06beb874df3b39da7c9c73.jpeg",
      3.34
    ),
    createData(
      "Fall upon you",
      "https://media.pitchfork.com/photos/5929b628b1335d7bf169a9fa/1:1/w_600/2c34c1fc.jpg",
      0.67
    ),
    createData(
      "Regalo Live",
      "https://thesagenews.com/wp-content/uploads/2018/03/IMG_4584-900x900.jpg",
      2.63
    ),
    createData(
      "Who are you?",
      "https://m.media-amazon.com/images/I/61R58SHW+GL._SL1500_.jpg",
      2.63
    ),
    createData(
      "Tequila Shots",
      "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      2.63
    ),
  ],
  isLoading: false,
  isSuccess: true,
};
