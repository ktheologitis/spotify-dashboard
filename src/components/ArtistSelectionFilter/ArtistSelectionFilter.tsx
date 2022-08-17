import ArtistCard from "../ArtistCard/ArtistCard";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import { Artist, Nullable } from "../../lib/types";
import { FilterTypes, IconButtonStyles } from "../../lib/enums";
import informationIcon from "../../static/icons/information.svg";
import shuffleIcon from "../../static/icons/update.svg";
import okIcon from "../../static/icons/ok.svg";
import { useSelectionFilterLogic } from "../../hooks/useSelectionFilterLogic";
import React from "react";
import "../../stylesheets/filter-section.scss";

const ArtistSelectionFilter = ({
  topArtists,
  selectedArtists,
  updateFilter,
}: ArtistSelectionFilterProps) => {
  const {
    displayed,
    searchValue,
    handleClick,
    handleShuffle,
    handleChangeSearchInput,
    setCanSearch,
  } = useSelectionFilterLogic(
    FilterTypes.Artists,
    topArtists,
    selectedArtists,
    updateFilter
  );

  return (
    <>
      <section className="entity-section">
        <header className="entity-section__header">
          <h1 className="entity-section__title">Artists</h1>
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
            label="Search artist..."
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
        {displayed?.map((artist) => {
          return (
            <React.Fragment key={artist.id}>
              <ArtistCard
                id={artist.id}
                name={artist.name}
                img={artist.images.medium}
                isSelected={
                  selectedArtists
                    ? selectedArtists.includes(artist.id)
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

export default React.memo(ArtistSelectionFilter);

type ArtistSelectionFilterProps = {
  topArtists: Nullable<Artist[]>;
  selectedArtists: Nullable<string[]>;
  updateFilter: (
    filterType: FilterTypes,
    newFilters: string[]
  ) => void;
};
