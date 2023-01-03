import React, {
  useState,
  useContext,
  useLayoutEffect,
  useCallback,
} from "react";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import { IconButtonStyles } from "../../lib/enums";
import updateIcon from "../../static/icons/update.svg";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider";
import { useSearch } from "../../hooks/useSearch";
import { Artist, Nullable } from "../../lib/types";
import ArtistCard from "../ArtistCard/ArtistCard";
import { FilterState } from "../../hooks/useFilter";
import "./filter-section.scss";

const ArtistFilterSection = ({
  topArtists,
  artistsFilter,
}: {
  topArtists: Nullable<Artist[]>;
  artistsFilter: FilterState<string[] | null>;
}) => {
  const [artists, setArtists] = useState(topArtists);
  const [searchValue, setSearchValue] = useState("");

  const auth = useContext(AuthContext);
  const { searchResults, isLoading, isFetching } = useSearch<
    Artist[]
  >(auth.token, searchValue, "artist");

  const handleArtistCardClick = (selected: string) => {
    if (artistsFilter.data?.includes(selected)) {
      artistsFilter.set(
        artistsFilter.data.filter((item) => item !== selected)
      );
      return;
    }
    artistsFilter.data
      ? artistsFilter.set([...artistsFilter.data, selected])
      : artistsFilter.set([selected]);
  };

  const handleSearchInputChange = useCallback(
    (newInput: string) => {
      setSearchValue(newInput);
    },
    []
  );

  useLayoutEffect(() => {
    if (searchValue.trim() === "") {
      setArtists(topArtists);
      return;
    }
    if (searchResults) setArtists(searchResults);
  }, [searchResults, searchValue, topArtists]);

  return (
    <>
      <section className="filter-section">
        <header className="filter-section__header">
          <h1 className="filter-section__title">Artists</h1>
          <IconButton
            iconSrc={updateIcon}
            style={IconButtonStyles.Secondary}
          />
          <Input
            label="Artists"
            handleChangeValue={handleSearchInputChange}
          />
        </header>
        <main className="filter-section__main">
          {artists &&
            artists.map((artist) => {
              return (
                <React.Fragment key={artist.id}>
                  <ArtistCard
                    images={artist.images}
                    name={artist.name}
                    selected={artistsFilter.data?.includes(
                      artist.id
                    )}
                    handleClick={() => {
                      handleArtistCardClick(artist.id);
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
    </>
  );
};

export default ArtistFilterSection;
