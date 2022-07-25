export type Nullable<T> = T | null;

export type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  profile_url: string;
  image_path: string;
  topSongs: Nullable<Song[]>;
  topArtists: Nullable<Artist[]>;
};

export type Filters = {
  artists: string[];
  songs: string[];
  genres: string[];
  acousticness: Nullable<number>;
  valence: Nullable<number>;
  danceability: Nullable<number>;
  loudness: Nullable<number>;
};

export type Song = {
  id: string;
  name: string;
  external_url: string;
  images: { medium: string; large: string };
  album: string;
  artists: string[];
};

export type Artist = {
  id: string;
  name: string;
  external_url: string;
  images: { medium: string; large: string };
};
