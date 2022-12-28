import React from "react";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import { IconButtonStyles } from "../../lib/enums";
import informationIcon from "../../static/icons/information.svg";
import updateIcon from "../../static/icons/update.svg";
import { Nullable, Song } from "../../lib/types";
import { FilterState } from "../../hooks/useFilter";
import "./filter-section.scss";
import SongCard from "../SongCard/SongCard";

const SongFilterSection = ({
  topSongs,
  songFilter,
}: {
  topSongs: Nullable<Song[]>;
  songFilter: FilterState<string[] | null>;
}) => {
  const handleSongCardClick = (selected: string) => {
    if (songFilter.data?.includes(selected)) {
      songFilter.set(
        songFilter.data.filter((item) => item !== selected)
      );
      return;
    }
    songFilter.data
      ? songFilter.set([...songFilter.data, selected])
      : songFilter.set([selected]);
  };

  return (
    <section className="filter-section">
      <header className="filter-section__header">
        <h1 className="filter-section__title">Songs</h1>
        <IconButton
          iconSrc={informationIcon}
          style={IconButtonStyles.Secondary}
        />
        <IconButton
          iconSrc={updateIcon}
          style={IconButtonStyles.Secondary}
        />
        <Input label="Songs" handleChangeValue={() => {}} />
      </header>
      <main className="filter-section__main">
        {topSongs &&
          topSongs.map((song) => {
            return (
              <React.Fragment key={song.id}>
                <SongCard
                  images={song.album.images}
                  name={song.name}
                  album={song.album.name}
                  selected={songFilter.data?.includes(song.id)}
                  handleClick={() => {
                    handleSongCardClick(song.id);
                  }}
                />
              </React.Fragment>
            );
          })}
      </main>
      <footer className="filter-section__footer">
        <em>See selected</em>
      </footer>
    </section>
  );
};

export default SongFilterSection;
