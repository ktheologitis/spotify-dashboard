import React from "react";
import IconButton from "../IconButton/IconButton";
import { IconButtonStyles } from "../../lib/enums";
import informationIcon from "../../static/icons/information.svg";
import updateIcon from "../../static/icons/update.svg";
import { Nullable } from "../../lib/types";
import { FilterState } from "../../hooks/useFilter";
import "./filter-section.scss";
import Chip from "../Chip/Chip";

const GenreFilterSection = ({
  genres,
  genresFilter,
}: {
  genres: Nullable<string[]>;
  genresFilter: FilterState<string[] | null>;
}) => {
  const handleClick = (selected: string) => {
    if (genresFilter.data?.includes(selected)) {
      genresFilter.set(
        genresFilter.data.filter((item) => item !== selected)
      );
      return;
    }
    genresFilter.data
      ? genresFilter.set([...genresFilter.data, selected])
      : genresFilter.set([selected]);
  };

  return (
    <section className="filter-section">
      <header className="filter-section__header">
        <h1 className="filter-section__title">Genres</h1>
        <IconButton
          iconSrc={informationIcon}
          style={IconButtonStyles.Secondary}
        />
        <IconButton
          iconSrc={updateIcon}
          style={IconButtonStyles.Secondary}
        />
      </header>
      <main className="filter-section__main--genres">
        {genres &&
          genres.slice(0, 10).map((genre: string) => {
            return (
              <React.Fragment key={genre}>
                <Chip
                  label={genre}
                  selected={genresFilter.data?.includes(genre)}
                  handleClick={() => {
                    handleClick(genre);
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

export default GenreFilterSection;
