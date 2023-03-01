import { FilterState } from "../../hooks/useFilter";
import "./filter-section.scss";
import SliderInput from "../SliderInput/SliderInput";
import { useState, useEffect } from "react";

const AudioFeatureFilterSection = ({
  name,
  audioFeatureFilter,
}: {
  name: string;
  audioFeatureFilter: FilterState<number | null>;
}) => {
  const [audioFeatureValue, setAudioFeatureValue] = useState("");

  const handleSliderInput = (value: number) => {
    audioFeatureFilter.set(value);
  };

  useEffect(() => {
    if (
      !audioFeatureFilter.filter ||
      audioFeatureFilter.filter === 0
    ) {
      setAudioFeatureValue("");
    } else {
      setAudioFeatureValue(audioFeatureFilter.filter.toString());
    }
  }, [audioFeatureFilter.filter]);

  return (
    <section className="filter-section">
      <header className="filter-section__header">
        <h1 className="filter-section__title">{name}</h1>
        <div className="audio-feature-value">
          {audioFeatureValue}
          <span> %</span>
        </div>
      </header>
      <main className="filter-section__main--audio-feature">
        <div className="slider-wrapper">
          <SliderInput
            currentValue={
              audioFeatureFilter.filter
                ? audioFeatureFilter.filter
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
