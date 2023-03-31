export interface MediaItem {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export interface MediaApiResponse {
  page: number;
  results: Video[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface DetailedMovie {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: MediaApiResponse;
}

export interface DetailedTVShow {
  adult: boolean;
  backdrop_path: string;
  episode_run_time: number[];
  first_air_date: string;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  next_episode_to_air?: any;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: MediaApiResponse;
}
export interface FetchFavoriteMedia {
  accountId: number;
  sessionId: string;
  mediaType: MediaType;
}

export interface HandleFavorites {
  accountId: number;
  sessionId: string;
  mediaId: number;
  mediaType: MediaType;
  favorite: boolean;
}

export enum MediaType {
  Movie = "movie",
  TV = "tv",
  Movies = "movies",
}
