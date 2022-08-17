import searchIcon from "../../static/icons/search.svg";
import "./input.scss";

const Input = ({
  label,
  handleChange,
}: {
  label: string;
  handleChange: (value: string) => void;
}) => {
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
        placeholder={label}
        name="spotify-input"
        type="text"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
