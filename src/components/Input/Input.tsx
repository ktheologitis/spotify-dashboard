import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import searchIcon from "../../static/icons/search.svg";
import "./input.scss";

const Input = ({
  label,
  handleChangeValue,
}: {
  label: string;
  handleChangeValue: (newInput: string) => void;
}) => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    handleChangeValue(debouncedInput);
  }, [debouncedInput, handleChangeValue]);

  return (
    <div className="input-container">
      <label
        className="input-container__icon"
        htmlFor="spotify-input"
      >
        <img src={searchIcon} alt="search" loading="lazy" />
      </label>
      <input
        type="search"
        autoComplete="off"
        className="input-container__input"
        placeholder={label}
        name="spotify-input"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
      ></input>
    </div>
  );
};

export default Input;
