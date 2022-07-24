import React from "react";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import FilterSection from "../../components/FilterSection/FilterSection";
import SongCard from "../../components/SongCard/SongCard";
import Chip from "../../components/Chip/Chip";
import IconButton from "../../components/IconButton/IconButton";
import SliderInput from "../../components/SliderInput/SliderInput";
import { Filters, IconButtonStyles } from "../../lib/enums";
import okIcon from "../../static/icons/ok.svg";

import "./filter-page.scss";

const FilterPage = () => {
  const artistData: { name: string; imgSrc: string }[] = [
    { name: "Dino", imgSrc: "" },
    { name: "Niko", imgSrc: "" },
    { name: "Deaf Radio", imgSrc: "" },
    { name: "Rattler Proxy", imgSrc: "" },
  ];

  const songData: { name: string; imgSrc: string }[] = [
    { name: "Dino", imgSrc: "" },
    { name: "Niko", imgSrc: "" },
    { name: "Deaf Radio", imgSrc: "" },
    { name: "Rattler Proxy", imgSrc: "" },
  ];

  const artists = (
    <>
      {artistData.map((data) => {
        return (
          <React.Fragment key={data.name}>
            <ArtistCard imgSrc={data.imgSrc} name={data.name} />
          </React.Fragment>
        );
      })}
    </>
  );

  const songs = (
    <>
      {songData.map((data) => {
        return (
          <React.Fragment key={data.name}>
            <SongCard
              imgSrc={data.imgSrc}
              name={data.name}
              album={data.name}
            />
          </React.Fragment>
        );
      })}
    </>
  );

  const genreData = [
    { name: "Classical" },
    { name: "Classical" },
    { name: "Classical" },
    { name: "Classical" },
    { name: "Classical" },
    { name: "Classical" },
    { name: "Classical" },
    { name: "Classical" },
    { name: "Classical" },
    { name: "Classical" },
    { name: "Classical" },
  ];

  const genres = (
    <>
      {genreData.map((genre, index) => {
        return (
          <React.Fragment key={index}>
            <Chip label={genre.name} />
          </React.Fragment>
        );
      })}
    </>
  );

  return (
    <main className="filter-page">
      <FilterSection
        type={Filters.Artist}
        title="Artists"
        filter={artists}
      />
      <FilterSection
        type={Filters.Song}
        title="Songs"
        filter={songs}
      />
      <FilterSection
        type={Filters.Genre}
        title="Genres"
        filter={genres}
      />
      <FilterSection
        type={Filters.AudioFeature}
        title="Acousticness"
        filter={
          <div className="slider-wrapper">
            <SliderInput />
          </div>
        }
      />
      <FilterSection
        type={Filters.AudioFeature}
        title="Valence"
        filter={
          <div className="slider-wrapper">
            <SliderInput />
          </div>
        }
      />
      <FilterSection
        type={Filters.AudioFeature}
        title="Danceability"
        filter={
          <div className="slider-wrapper">
            <SliderInput />
          </div>
        }
      />
      <FilterSection
        type={Filters.AudioFeature}
        title="Loudness"
        filter={<SliderInput />}
      />
      <section className="ok-icon-button">
        <IconButton
          iconSrc={okIcon}
          style={IconButtonStyles.Primary}
        />
      </section>
    </main>
  );
};

export default FilterPage;
