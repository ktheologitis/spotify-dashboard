import { z } from "zod";

const ImageSchema = z.object({
  height: z.number(),
  width: z.number(),
  url: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  country: z.string(),
  display_name: z.string(),
  email: z.string().email(),
  uri: z.string(),
  images: z.array(z.object({ url: z.string() })),
});

export const SongSchema = z.object({
  id: z.string(),
  name: z.string(),
  external_urls: z.object({ spotify: z.string() }),
  album: z.object({
    name: z.string(),
    images: z.array(ImageSchema),
  }),
});

export const TopSongsSchema = z.object({
  items: z.array(SongSchema),
  total: z.number(),
});

export const RecommendationsSchema = z.object({
  tracks: z.array(SongSchema),
});

export const ArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  external_urls: z.object({ spotify: z.string() }),
  images: z.array(ImageSchema),
});

export const TopArtistsSchema = z.object({
  items: z.array(ArtistSchema),
  total: z.number(),
});

export const GenresSchema = z.object({
  genres: z.array(z.string()),
});

export const ArtistSearchSchema = z.object({
  artists: z.object({ items: z.array(ArtistSchema) }),
});

export const SongSearchSchema = z.object({
  tracks: z.object({ items: z.array(SongSchema) }),
});

export type Nullable<T> = T | null;

export type Image = z.infer<typeof ImageSchema>;

export type User = z.infer<typeof UserSchema>;

export type Song = z.infer<typeof SongSchema>;

export type Artist = z.infer<typeof ArtistSchema>;

export type ArtistsFilter = { ids: string[]; data: Artist[] };

export type SongsFilter = { ids: string[]; data: Song[] };

export type Filters = {
  artists: ArtistsFilter;
  songs: SongsFilter;
  genres: string[];
  acousticness: Nullable<number>;
  valence: Nullable<number>;
  danceability: Nullable<number>;
  loudness: Nullable<number>;
};
