import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "@mui/material/styles";
import searchIcon from "../../static/icons/search.svg";
import "./input.scss";
import { theme } from "../../theme";

const Input = ({
  label,
  loading,
  handleChangeValue,
}: {
  label: string;
  loading: boolean;
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
        {loading ? (
          <ThemeProvider theme={theme}>
            <CircularProgress size={24} color="primary" />
          </ThemeProvider>
        ) : (
          <img src={searchIcon} alt="search" loading="lazy" />
        )}
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
