import Logo from "../Logo/Logo";
import UserIcon from "../UserIcon/UserIcon";
import "./app-bar.scss";

const AppBar = () => {
  return (
    <header className="app-bar">
      <Logo />
      <h1 className="app-title">RUBIN</h1>
      <UserIcon />
    </header>
  );
};

export default AppBar;
