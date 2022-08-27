import "./input.scss";
import searchIcon from "../../static/icons/search.svg";

const Input = ({ label }: { label: string }) => {
  return (
    <div className="input-container">
      <label
        className="input-container__icon"
        htmlFor="spotify-input"
      >
        <img src={searchIcon} alt="search" loading="lazy" />
      </label>
      <input
        className="input-container__input"
        placeholder={label}
        name="spotify-input"
        type="text"
      ></input>
    </div>
  );
};

export default Input;
