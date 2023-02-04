import { CLIENT_ID, SCOPE, REDIRECT_CALLBACK } from "../config";

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

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
