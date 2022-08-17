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

export type AudioFeatureData = {
  enabled: boolean;
  value: Nullable<number>;
};

export type Filters = {
  artists: Nullable<string[]>;
  songs: Nullable<string[]>;
  genres: Nullable<string[]>;
  acousticness: AudioFeatureData;
  valence: AudioFeatureData;
  danceability: AudioFeatureData;
  loudness: AudioFeatureData;
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
