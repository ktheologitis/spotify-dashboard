import { Slider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import "./slider-input.scss";

const SliderInput = ({
  handleChange,
  currentValue,
}: {
  currentValue: number;
  handleChange: (newValue: number) => void;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="slider-input">
        <Slider
          min={0}
          max={100}
          value={currentValue}
          onChange={(e: Event, newValue) => {
            handleChange(newValue as any);
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default SliderInput;
