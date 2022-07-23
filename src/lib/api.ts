import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.spotify.com/v1";

export async function getMyData(token: string) {
  const response: AxiosResponse<{ display_name: string }> =
    await axios.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // params: {
      //   seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
      //   seed_genres: "classical",
      //   seed_tracks: "0c6xIDDpzE81m2q797ordA",
      // },
    });
  return response.data;
}
