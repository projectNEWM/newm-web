export interface ContentState {
  genres: ReadonlyArray<string>;
  roles: ReadonlyArray<string>;
  errorMessage: string;
}

export interface ContentResponse {
  genres: ReadonlyArray<string>;
  roles: ReadonlyArray<string>;
}
