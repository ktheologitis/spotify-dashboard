export const CLIENT_ID = "6937b6a3fc7e40d2a6b02f7981220753";
export const SCOPE =
  "user-read-private user-read-email user-top-read user-library-read";
export const REDIRECT_CALLBACK = () => {
  return window.location.origin ===
    "https://spotify-dashboard-red.vercel.app"
    ? "https://spotify-dashboard-red.vercel.app/authorize/callback"
    : "http://localhost:3000/authorize/callback";
};
