import { useContext } from "react";
import AppTitle from "../AppTitle/AppTitle";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider/AuthorizationContextProvider";
import Logo from "../Logo/Logo";
import UserIcon from "../UserIcon/UserIcon";
import "./app-bar.scss";
import { UserDataContext } from "../../contextProviders/UserDataContextProvider/UserDataContextProvider";

const AppBar = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserDataContext);

  return (
    <header className="app-bar">
      <Logo />
      <AppTitle />
      {auth.token && user && (
        <UserIcon
          imgSrc={user.image_path}
          userName={user.name}
        />
      )}
    </header>
  );
};

export default AppBar;
