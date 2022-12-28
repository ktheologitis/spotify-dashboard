import { FilterState } from "../../hooks/useFilter";
import "./filter-section.scss";
import SliderInput from "../SliderInput/SliderInput";

const AudioFeatureFilterSection = ({
  name,
  audioFeatureFilter,
}: {
  name: string;
  audioFeatureFilter: FilterState<number | null>;
}) => {
  const handleSliderInput = (value: number) => {
    audioFeatureFilter.set(value);
  };

  return (
    <section className="filter-section">
      <header className="filter-section__header">
        <h1 className="filter-section__title">{name}</h1>
        <div className="audio-feature-value">
          {audioFeatureFilter.data?.toString() || ""}
          <span> %</span>
        </div>
      </header>
      <main className="filter-section__main--audio-feature">
        <div className="slider-wrapper">
          <SliderInput
            currentValue={
              audioFeatureFilter.data
                ? audioFeatureFilter.data
                : 0
            }
            handleChange={(newValue) => {
              handleSliderInput(newValue);
            }}
          />
        </div>
      </main>
    </section>
  );
};

export default AudioFeatureFilterSection;
