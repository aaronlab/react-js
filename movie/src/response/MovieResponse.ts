export type MovieItem = {
  id: number;
  url?: string;
  title?: string;
  summary?: string;
  genres?: string[];
  medium_cover_image?: string;
};

export type MovieData = {
  movies?: MovieItem[];
};

export type MovieResponse = {
  data?: MovieData;
};
