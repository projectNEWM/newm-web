// mock data until api is ready

let id = 0;
export function createData(
  name: string,
  song: string,
  info_tbd: number,
  registered: boolean
) {
  id = id + 1;
  return { id, name, song, info_tbd, registered };
}
export interface Owner {
  id: number;
  name: string;
  song: string;
  info_tbd: number;
  registered: boolean;
}

const mockOwnersData: Owner[] = [
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Cody Fisher", "Life's away", 4, false),
  createData("Esther Howard", "Once upon a time", 0.5, false),
  createData("Jenny Wilson", "When is it time?", 1, true),
  createData("Kristin Watson", "Can you hold it?", 2, false),
  createData("Cameron Williamson", "Call me", 1, false),
  createData("J Cole", "Neighbors", 1, false),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Cody Fisher", "Life's away", 4, false),
  createData("Esther Howard", "Once upon a time", 0.5, false),
  createData("Jenny Wilson", "When is it time?", 1, true),
  createData("Kristin Watson", "Can you hold it?", 2, false),
  createData("Cameron Williamson", "Call me", 1, false),
  createData("Jane Cooper", "Once upon a time", 1, true),
  createData("Cody Fisher", "Life's away", 4, false),
  createData("Esther Howard", "Once upon a time", 0.5, false),
  createData("Jenny Wilson", "When is it time?", 1, true),
  createData("Kristin Watson", "Can you hold it?", 2, false),
  createData("Cameron Williamson", "Call me", 1, false),
];

export default mockOwnersData;
