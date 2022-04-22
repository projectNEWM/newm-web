export interface ContentState {
  genres: Array<string>;
  roles: Array<string>;
  errorMessage: string;
}

export interface ContentResponse {
  readonly genres: Array<string>;
  readonly roles: Array<string>;
}
