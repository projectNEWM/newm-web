import { GetSongGenresResponse, GetSongRolesResponse } from "./types";

export const extractGenreNames = (genres: GetSongGenresResponse): string[] =>
  genres.map((genre) => genre.name);

export const extractRoleNames = (roles: GetSongRolesResponse): string[] =>
  roles.map((role) => role.name);
