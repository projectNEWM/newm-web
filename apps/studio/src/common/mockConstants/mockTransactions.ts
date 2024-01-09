/* eslint-disable max-len */
let id = 0;
function createData(
  description: string,
  date: string,
  time: string,
  amount: number,
  iconImgUrl: string,
  songName?: string
) {
  id = id + 1;
  return { amount, date, description, iconImgUrl, id, songName, time };
}
export interface Transaction {
  amount: number;
  date: string;
  description: string;
  iconImgUrl?: string;
  id: number;
  songName?: string;
  time: string;
}
export interface TransactionsResponse {
  data: Transaction[];
  isLoading: boolean;
  isSuccess: boolean;
}

export const mockTransactions: TransactionsResponse = {
  data: [
    createData(
      "Royalties Claimed",
      new Date("August 1, 2022").toDateString(),
      "18:42:00",
      3.11,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659497259/Frame_37_rzlabo.png"
    ),
    createData(
      "Minting Fee",
      new Date("August 1, 2022").toDateString(),
      "13:42:00",
      3.12,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659802090/Frame_40_qa0ddw.png"
    ),
    createData(
      "Royalties Claimed",
      new Date("June 13, 2022").toDateString(),
      "14:42:00",
      3.13,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659497259/Frame_37_rzlabo.png"
    ),
    createData(
      "Minting Fee",
      new Date("May 30, 2022").toDateString(),
      "16:42:00",
      2.14,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659802090/Frame_40_qa0ddw.png"
    ),
    createData(
      "Minting Fee",
      new Date("May 30, 2022").toDateString(),
      "03:42:00",
      3.15,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659802090/Frame_40_qa0ddw.png"
    ),
    createData(
      "Royalties Claimed",
      new Date("May 30, 2022").toDateString(),
      "14:42:00",
      5.13,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659497259/Frame_37_rzlabo.png"
    ),
    createData(
      "Royalties Claimed",
      new Date("April 29, 2022").toDateString(),
      "18:42:00",
      3.11,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659497259/Frame_37_rzlabo.png"
    ),
    createData(
      "Minting Fee",
      new Date("April 29, 2022").toDateString(),
      "13:42:00",
      3.12,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659802090/Frame_40_qa0ddw.png"
    ),
    createData(
      "Royalties Claimed",
      new Date("April 25, 2022").toDateString(),
      "14:42:00",
      3.13,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659497259/Frame_37_rzlabo.png"
    ),
    createData(
      "Minting Fee",
      new Date("April 20, 2022").toDateString(),
      "16:42:00",
      2.14,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659802090/Frame_40_qa0ddw.png"
    ),
    createData(
      "Minting Fee",
      new Date("April 16, 2022").toDateString(),
      "03:42:00",
      3.15,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659802090/Frame_40_qa0ddw.png"
    ),
    createData(
      "Royalties Claimed",
      new Date("April 16, 2022").toDateString(),
      "14:42:00",
      5.13,
      "https://res.cloudinary.com/projectnewm/image/upload/v1659497259/Frame_37_rzlabo.png"
    ),
  ],
  isLoading: false,
  isSuccess: true,
};
