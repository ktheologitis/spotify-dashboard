import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import IconButton from "../IconButton/IconButton";
import { IconButtonStyles } from "../../lib/enums";
import informationIcon from "../../static/icons/information.svg";
import { Nullable } from "../../lib/types";
import { FilterState } from "../../hooks/useFilter";
import "./filter-section.scss";
import Chip from "../Chip/Chip";
import { useGenres } from "../../hooks/useGenres";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider";

const GenreFilterSection = ({
  genresFilter,
}: {
  genresFilter: FilterState<string[] | null>;
}) => {
  const auth = useContext(AuthContext);
  const genres = useGenres(auth.token);
  const [displayedGenres, setDisplayedGenres] =
    useState<Nullable<string[]>>(null);

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

  useLayoutEffect(() => {
    if (genres)
      setDisplayedGenres(
        genres.length > 15 ? genres.slice(0, 15) : genres
      );
  }, [genres]);

  return (
    <section className="filter-section">
      <header className="filter-section__header">
        <h1 className="filter-section__title">Genres</h1>
        <IconButton
          iconSrc={informationIcon}
          style={IconButtonStyles.Secondary}
        />
      </header>
      <main className="filter-section__main--genres">
        {displayedGenres &&
          displayedGenres.map((genre: string) => {
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
        {displayedGenres && genres && (
          <span>
            <button
              onClick={() => {
                setDisplayedGenres(
                  displayedGenres.length > 15
                    ? genres.slice(0, 15)
                    : genres
                );
              }}
            >
              {displayedGenres.length > 15
                ? "show less"
                : "show more"}
            </button>
          </span>
        )}
      </main>
      <footer className="filter-section__footer">
        <em>See selected</em>
      </footer>
    </section>
  );
};

export default GenreFilterSection;
