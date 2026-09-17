export interface DisneyApiCharacter {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  enemies: string[];
  allies: string[];
}

export interface DisneyApiInfo {
  totalPages: number;
  count: number;
  previousPage: string | null;
  nextPage: string | null;
}

export interface DisneyApiResponse {
  info: DisneyApiInfo;
  data: DisneyApiCharacter[];
}
