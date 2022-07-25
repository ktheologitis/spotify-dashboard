import { CLIENT_ID, SCOPE, REDIRECT_CALLBACK } from "../config";
import { Artist, Song } from "./types";

export const getTokenFromUrl = () => {
  return window.location.href.split("=")[1]?.split("&")[0];
};

export const authorize = () => {
  window.location.href = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
    SCOPE
  )}&redirect_uri=${encodeURIComponent(REDIRECT_CALLBACK)}`;
};

export const signup = () => {
  window.location.href = "https://open.spotify.com/";
};

export const transformToLocalSongType = (
  apiData: any[]
): Song[] => {
  const songs = apiData.map((song) => {
    return {
      id: song.id,
      name: song.name,
      external_url: song.external_urls?.spotify,
      images: {
        medium: song.album?.images[1].url,
        large: song.album?.images[2].url,
      },
      album: song.album?.name,
      artists: song.artists?.map((artist: any) => artist.name),
    };
  });
  return songs;
};

export const transformToLocalArtistType = (
  apiData: any[]
): Artist[] => {
  const artists = apiData.map((artist) => {
    return {
      id: artist.id,
      name: artist.name,
      external_url: artist.external_urls?.spotify,
      images: {
        medium: artist.images[1]?.url,
        large: artist.images[2]?.url,
      },
    };
  });
  return artists;
};

export const getAudioFeatureMax = (
  value: number | null,
  offset: number = 0
) => {
  let max;
  if (!value) return null;
  if (value + offset > 100) max = 1;
  if (value + offset < 100) max = (value + offset) / 100;
  return max;
};

export const getAudioFeatureMin = (
  value: number | null,
  offset: number = 0
) => {
  let min;
  if (!value) return null;
  if (value - offset < 0) min = 0;
  if (value - offset > 0) min = (value - offset) / 100;
  return min;
};
