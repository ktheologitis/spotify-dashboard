import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.spotify.com/v1";

export async function getMyData(token: string) {
  const response: AxiosResponse<{ display_name: string }> = await axios.get("/me", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
