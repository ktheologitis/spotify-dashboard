import IconButton from "../IconButton/IconButton";
import { Nullable } from "../../lib/types";
import { FilterTypes, IconButtonStyles } from "../../lib/enums";
import informationIcon from "../../static/icons/information.svg";
import shuffleIcon from "../../static/icons/update.svg";
import { useSelectionFilterLogic } from "../../hooks/useSelectionFilterLogic";
import React from "react";
import "../../stylesheets/filter-section.scss";
import Chip from "../Chip/Chip";

const GenreSelectionFilter = ({
  genres,
  selectedGenres,
  updateFilter,
}: GenreSelectionFilterProps) => {
  const { displayed, handleClick, handleShuffle } =
    useSelectionFilterLogic(
      FilterTypes.Genres,
      genres,
      selectedGenres,
      updateFilter
    );

  return (
    <>
      <section className="entity-section">
        <header className="entity-section__header">
          <h1 className="entity-section__title">Genres</h1>
          <IconButton
            iconSrc={informationIcon}
            style={IconButtonStyles.Secondary}
          />
          <IconButton
            iconSrc={shuffleIcon}
            style={IconButtonStyles.Secondary}
            handleClick={handleShuffle}
          />
        </header>
      </section>
      <main className="entity-section__main--genres">
        {displayed?.map((genre) => {
          return (
            <React.Fragment key={genre}>
              <Chip
                label={genre}
                isSelected={
                  selectedGenres
                    ? selectedGenres.includes(genre)
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

export default React.memo(GenreSelectionFilter);

type GenreSelectionFilterProps = {
  genres: Nullable<string[]>;
  selectedGenres: Nullable<string[]>;
  updateFilter: (
    filterType: FilterTypes,
    newFilters: string[]
  ) => void;
};
