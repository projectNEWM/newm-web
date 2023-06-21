export type Extractable = {
  name: string;
};

export interface Genre {
  readonly genre_id: number;
  readonly name: string;
}

export interface Role {
  readonly role_id: number;
  readonly name: string;
}

export interface Language {
  readonly language_id: number;
  readonly name: string;
}
