import { useContext } from "react";
import Logo from "../Logo/Logo";
import UserIcon from "../UserIcon/UserIcon";
import "./app-bar.scss";
import { UserDataContext } from "../../contextProviders/UserDataContextProvider";

const AppBar = () => {
  const user = useContext(UserDataContext);

  return (
    <header className="app-bar">
      <Logo />
      <h1 className="app-title">RUBIN</h1>
      <UserIcon
        imgSrc={user?.image_path}
        userName={user?.name}
        show={user ? true : false}
      />
    </header>
  );
};

export default AppBar;
