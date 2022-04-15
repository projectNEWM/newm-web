export interface RoleState {
  roles: ReadonlyArray<Role>;
}

export enum Role {
  Producer = "Producer",
  Singer = "Singer",
  SoundEngineer = "SoundEngineer",
}
