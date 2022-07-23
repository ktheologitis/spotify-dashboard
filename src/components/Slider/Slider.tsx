import "./slider.scss";

const Slider = () => {
  return (
    <input
      className="slider"
      type="range"
      min="0"
      max="100"
      onChange={(e: any) => {
        console.log(e.target.value);
      }}
    />
  );
};

export default Slider;
