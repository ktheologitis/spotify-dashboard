import { Slider } from "@mui/material";
import { Nullable } from "../../lib/types";
import "./slider-input.scss";

const SliderInput = ({
  currentValue,
  enabled,
  handleChange,
}: {
  currentValue: Nullable<number>;
  enabled: boolean;
  handleChange: (newValue: number) => void;
}) => {
  return (
    <div className="slider-input">
      <Slider
        min={0}
        max={100}
        disabled={!enabled}
        value={currentValue ?? 0}
        onChange={(e: Event, newValue) => {
          handleChange(newValue as any);
        }}
      />
    </div>
  );
};

export default SliderInput;
