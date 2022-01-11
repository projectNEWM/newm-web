import { Role } from "./role";

export interface Contributor {
  name: string;
  role: Role;
  stake: number;
}
