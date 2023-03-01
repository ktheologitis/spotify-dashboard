import axios, { AxiosResponse } from "axios";
import {
  getAudioFeatureMax,
  getAudioFeatureMin,
} from "./helpers";
import { Artist, Filters, Song } from "./types";

axios.defaults.baseURL = "https://api.spotify.com/v1";

function getHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function getUserData(token: string) {
  const response: AxiosResponse = await axios.get("/me", {
    headers: getHeaders(token),
  });
  return response.data;
}

export async function getUserTopSongs(
  token: string,
  offset: number,
  limit: number
) {
  const response: AxiosResponse = await axios.get(
    "me/top/tracks",
    {
      params: { limit, offset },
      headers: getHeaders(token),
    }
  );
  return response.data;
}

export async function getUserTopArtists(
  token: string,
  offset: number,
  limit: number
) {
  const response: AxiosResponse = await axios.get(
    "me/top/artists",
    {
      params: { limit, offset },
      headers: getHeaders(token),
    }
  );
  return response.data;
}

export async function getGenres(token: string) {
  const response: AxiosResponse = await axios.get(
    "recommendations/available-genre-seeds",
    {
      params: { limit: 10 },
      headers: getHeaders(token),
    }
  );
  return response.data;
}

export async function getRecommendations(
  token: string,
  filters: Filters,
  limit: number
) {
  const offset = 10;
  const params = {
    seed_artists: filters.artists.ids.join(","),
    seed_genres: filters.genres.join(","),
    seed_tracks: filters.songs.ids.join(","),
    limit,
    max_acousticness: getAudioFeatureMax(
      filters.acousticness,
      offset
    ),
    min_acousticness: getAudioFeatureMin(
      filters.acousticness,
      offset
    ),
    max_valence: getAudioFeatureMax(filters.valence, offset),
    min_valence: getAudioFeatureMin(filters.valence, offset),
    max_loudness: getAudioFeatureMax(filters.loudness, offset),
    min_loudness: getAudioFeatureMin(filters.loudness, offset),
    max_danceability: getAudioFeatureMax(
      filters.danceability,
      offset
    ),
    min_danceability: getAudioFeatureMin(
      filters.danceability,
      offset
    ),
  };

  const response: AxiosResponse = await axios.get(
    "recommendations",
    {
      params: params,
      headers: getHeaders(token),
    }
  );
  return response.data;
}

export async function search<T extends Artist[] | Song[]>(
  token: string,
  q: string,
  type: "artist" | "track"
): Promise<T | undefined> {
  let limit = 10;
  if (type === "track") limit = 20;
  const response: AxiosResponse<T> = await axios.get("search", {
    params: { q, type, limit },
    headers: getHeaders(token),
  });
  return response.data;
}
