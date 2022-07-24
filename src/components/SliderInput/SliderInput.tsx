import { Slider } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import "./slider-input.scss";

const theme = createTheme({
  palette: {
    primary: { main: "#1db954" },
  },
});

const SliderInput = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="slider-input">
        <Slider min={0} max={100} />
      </div>
    </ThemeProvider>
  );
};

export default SliderInput;
