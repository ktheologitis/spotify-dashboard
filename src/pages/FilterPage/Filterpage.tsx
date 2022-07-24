import React from "react";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import EntitySection from "../../components/EntitySection/EntitySection";
import SongCard from "../../components/SongCard/SongCard";
import Chip from "../../components/Chip/Chip";
import IconButton from "../../components/IconButton/IconButton";
import "./filter-page.scss";
import "../../components/EntitySection/entity-section.scss";
import informationIcon from "../../static/icons/information.svg";
import updateIcon from "../../static/icons/update.svg";
import { IconButtonStyles } from "../../lib/enums";

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

  const genres = [
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

  return (
    <main className="filter-page">
      <EntitySection title="Artists" entities={artists} />
      <EntitySection title="Songs" entities={songs} />
      <section className="entity-section">
        <header className="entity-section__header">
          <h1 className="entity-section__title">Genres</h1>
          <IconButton
            iconSrc={informationIcon}
            style={IconButtonStyles.Secondary}
          />
          <IconButton
            iconSrc={updateIcon}
            style={IconButtonStyles.Secondary}
          />
        </header>
        <main className="genres-section__main">
          {genres.map((genre, index) => {
            return (
              <React.Fragment key={index}>
                <Chip label={genre.name} />
              </React.Fragment>
            );
          })}
        </main>
        <footer className="entity-section__footer">
          <em>See selected</em>
        </footer>
      </section>
      <section className="filter-page__audio-feature-section"></section>
    </main>
  );
};

export default FilterPage;
