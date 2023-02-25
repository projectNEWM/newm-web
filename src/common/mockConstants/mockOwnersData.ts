// mock data until api is ready

let id = 0;
export function createData(
  name: string,
  ownerPhoto: string,
  num_songs: number,
  email: string,
  status: string
) {
  id = id + 1;
  return { id, name, ownerPhoto, num_songs, email, status };
}
export interface Owner {
  id: number;
  name: string;
  ownerPhoto: string;
  num_songs: number;
  email: string;
  status: string;
}
export interface OwnersData {
  data: Owner[];
  isLoading: boolean;
  isSuccess: boolean;
}

export const mockOwnersData: OwnersData = {
  data: [
    createData(
      "Jane Cooper",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      4,
      "jane.cooper@gmail.com",
      "DECLINED"
    ),
    createData(
      "Cody Fisher",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      4,
      "cody.fisher@gmail.com",
      "ERROR"
    ),
    createData(
      "Esther Howard",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      1,
      "esther.hw@gmail.com",
      "PENDING"
    ),
    createData(
      "Tom Haverford",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      4,
      "jennny.wilson@gmail.com",
      ""
    ),
    createData(
      "Kristin Watson",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      7,
      "kristin.watson@gmail.com",
      ""
    ),
    createData(
      "Cameron Williamson",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      2,
      "cameron.williamson@gmail.com",
      ""
    ),
    createData(
      "Krombopolus Michael",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      8,
      "krombopolus.michael@gmail.com",
      ""
    ),
    createData(
      "Mary Jane",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      3,
      "mary.jane@gmail.com",
      ""
    ),
    createData(
      "James May",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      1,
      "james.may@gmail.com",
      ""
    ),
    createData(
      "Alma Lawson",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      11,
      "alma.lawson@gmail.com",
      ""
    ),

    createData(
      "Jane Cooper",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      4,
      "jane.cooper@gmail.com",
      "DECLINED"
    ),
    createData(
      "Cody Fisher",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      4,
      "cody.fisher@gmail.com",
      "ERROR"
    ),
    createData(
      "Esther Howard",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      1,
      "esther.hw@gmail.com",
      "PENDING"
    ),
    createData(
      "Tom Haverford",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      4,
      "jennny.wilson@gmail.com",
      ""
    ),
    createData(
      "Kristin Watson",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      7,
      "kristin.watson@gmail.com",
      ""
    ),
    createData(
      "Cameron Williamson",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      2,
      "cameron.williamson@gmail.com",
      ""
    ),
    createData(
      "Krombopolus Michael",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      8,
      "krombopolus.michael@gmail.com",
      ""
    ),
    createData(
      "Mary Jane",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      3,
      "mary.jane@gmail.com",
      ""
    ),
    createData(
      "James May",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      1,
      "james.may@gmail.com",
      ""
    ),
    createData(
      "Alma Lawson",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      11,
      "alma.lawson@gmail.com",
      ""
    ),
    createData(
      "Jane Cooper",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      4,
      "jane.cooper@gmail.com",
      "DECLINED"
    ),
    createData(
      "Cody Fisher",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      4,
      "cody.fisher@gmail.com",
      "ERROR"
    ),
    createData(
      "Esther Howard",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      1,
      "esther.hw@gmail.com",
      "PENDING"
    ),
    createData(
      "Tom Haverford",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      4,
      "jennny.wilson@gmail.com",
      ""
    ),
    createData(
      "Kristin Watson",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      7,
      "kristin.watson@gmail.com",
      ""
    ),
    createData(
      "Cameron Williamson",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      2,
      "cameron.williamson@gmail.com",
      ""
    ),
    createData(
      "Krombopolus Michael",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      8,
      "krombopolus.michael@gmail.com",
      ""
    ),
    createData(
      "Mary Jane",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      3,
      "mary.jane@gmail.com",
      ""
    ),
    createData(
      "James May",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      1,
      "james.may@gmail.com",
      ""
    ),
    createData(
      "Alma Lawson",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Weezer_-_Blue_Album.png",
      11,
      "alma.lawson@gmail.com",
      ""
    ),
  ],
  isLoading: false,
  isSuccess: true,
};

export default mockOwnersData;
