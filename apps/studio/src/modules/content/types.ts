export interface Genre {
  readonly genre_id: number;
  readonly name: string;
}

export interface Role {
  readonly name: string;
  readonly role_id: number;
}

export interface Language {
  readonly language_code: string;
  readonly language_name: string;
}
