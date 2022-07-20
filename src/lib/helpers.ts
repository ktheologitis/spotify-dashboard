export const getTokenFromUrl = () => {
  return window.location.href.split("=")[1]?.split("&")[0];
};
