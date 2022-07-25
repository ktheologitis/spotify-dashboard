import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

export const Layout = () => {
  return (
    <>
      <AppBar />
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined in Routing.tsx. */}
      <Outlet />
    </>
  );
};

export default Layout;
