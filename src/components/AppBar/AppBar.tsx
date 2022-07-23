import AppTitle from "../AppTitle/AppTitle";
import Logo from "../Logo/Logo";
import UserIcon from "../UserIcon/UserIcon";
import "./app-bar.scss";

const AppBar = () => {
  return (
    <header className="app-bar">
      <Logo />
      <AppTitle />
      <UserIcon imgSrc="" userName="Dino T" />
    </header>
  );
};

export default AppBar;
