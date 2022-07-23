import "./logo.scss";
import logo from "../../static/images/Spotify_Icon_RGB_Green.png";

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
