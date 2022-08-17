import axios, { AxiosResponse } from "axios";
import {
  getAudioFeatureMax,
  getAudioFeatureMin,
} from "./helpers";
import { Filters } from "./types";

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

export async function getUserTopSongs(token: string) {
  const response: AxiosResponse = await axios.get(
    "me/top/tracks",
    {
      params: { limit: 50 },
      headers: getHeaders(token),
    }
  );
  return response.data;
}

export async function getUserTopArtists(token: string) {
  const response: AxiosResponse = await axios.get(
    "me/top/artists",
    {
      params: { limit: 50 },
      headers: getHeaders(token),
    }
  );
  return response.data;
}

export async function getGenres(token: string) {
  const response: AxiosResponse = await axios.get(
    "recommendations/available-genre-seeds",
    {
      headers: getHeaders(token),
    }
  );
  return response.data;
}

export async function search(
  token: string,
  type: string,
  value: string
) {
  const response: AxiosResponse = await axios.get("search", {
    params: { q: value, type: type, limit: 10 },
    headers: getHeaders(token),
  });
  return response.data;
}

export async function getRecommendations(
  token: string,
  filters: Filters
) {
  const offset = 10;
  const params = {
    seed_artists: filters.artists?.join(","),
    seed_genres: filters.genres?.join(","),
    seed_tracks: filters.songs?.join(","),
    limit: 20,
    max_acousticness: filters.acousticness.enabled
      ? getAudioFeatureMax(filters.acousticness.value, offset)
      : null,
    min_acousticness: filters.acousticness.enabled
      ? getAudioFeatureMin(filters.acousticness.value, offset)
      : null,
    max_valence: filters.valence.enabled
      ? getAudioFeatureMax(filters.valence.value, offset)
      : null,
    min_valence: filters.valence.enabled
      ? getAudioFeatureMin(filters.valence.value, offset)
      : null,
    max_loudness: filters.loudness.enabled
      ? getAudioFeatureMax(filters.loudness.value, offset)
      : null,
    min_loudness: filters.loudness.enabled
      ? getAudioFeatureMin(filters.loudness.value, offset)
      : null,
    max_danceability: filters.danceability.enabled
      ? getAudioFeatureMax(filters.danceability.value, offset)
      : null,
    min_danceability: filters.loudness.enabled
      ? getAudioFeatureMin(filters.danceability.value, offset)
      : null,
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
