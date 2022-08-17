import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import { Nullable, Song } from "../../lib/types";
import { FilterTypes, IconButtonStyles } from "../../lib/enums";
import informationIcon from "../../static/icons/information.svg";
import shuffleIcon from "../../static/icons/update.svg";
import okIcon from "../../static/icons/ok.svg";
import { useSelectionFilterLogic } from "../../hooks/useSelectionFilterLogic";
import React from "react";
import SongCard from "../SongCard/SongCard";
import "../../stylesheets/filter-section.scss";

const SongSelectionFilter = ({
  topSongs,
  selectedSongs,
  updateFilter,
}: SongSelectionFilterProps) => {
  const {
    displayed,
    searchValue,
    handleClick,
    handleShuffle,
    handleChangeSearchInput,
    setCanSearch,
  } = useSelectionFilterLogic(
    FilterTypes.Songs,
    topSongs,
    selectedSongs,
    updateFilter
  );

  return (
    <>
      <section className="entity-section">
        <header className="entity-section__header">
          <h1 className="entity-section__title">Songs</h1>
          <IconButton
            iconSrc={informationIcon}
            style={IconButtonStyles.Secondary}
          />
          <IconButton
            iconSrc={shuffleIcon}
            style={IconButtonStyles.Secondary}
            handleClick={handleShuffle}
          />
          <Input
            label="Search song..."
            handleChange={handleChangeSearchInput}
          />
          {searchValue !== "" && (
            <IconButton
              iconSrc={okIcon}
              style={IconButtonStyles.Secondary}
              handleClick={() => {
                setCanSearch(true);
              }}
            />
          )}
        </header>
      </section>
      <main className="entity-section__main">
        {displayed?.map((song) => {
          return (
            <React.Fragment key={song.id}>
              <SongCard
                id={song.id}
                name={song.name}
                album={song.album}
                img={song.images.medium}
                isSelected={
                  selectedSongs
                    ? selectedSongs.includes(song.id)
                    : false
                }
                handleClick={handleClick}
              />
            </React.Fragment>
          );
        })}
      </main>
      <footer className="entity-section__footer">
        <em>See selected</em>
      </footer>
    </>
  );
};

export default React.memo(SongSelectionFilter);

type SongSelectionFilterProps = {
  topSongs: Nullable<Song[]>;
  selectedSongs: Nullable<string[]>;
  updateFilter: (
    filterType: FilterTypes,
    newFilters: string[]
  ) => void;
};
