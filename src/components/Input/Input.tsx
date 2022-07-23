import "./input.scss";
import searchIcon from "../../static/icons/search.svg";

const Input = () => {
  return (
    <div className="input-container">
      <label
        className="input-container__icon"
        htmlFor="spotify-input"
      >
        <img src={searchIcon} alt="search" />
      </label>
      <input
        className="input-container__input"
        placeholder="Artist"
        name="spotify-input"
        type="text"
      ></input>
    </div>
  );
};

export default Input;
