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
import { getRandomInt } from "../../lib/helpers";
import { useUser } from "../../hooks/useUser";
import { useTopArtists } from "../../hooks/useTopArtists";

const ArtistFilterSection = ({
  artistsFilter,
}: {
  artistsFilter: FilterState<string[] | null>;
}) => {
  const auth = useContext(AuthContext);
  const user = useUser(auth.token);
  const [searchValue, setSearchValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [artists, setArtists] =
    useState<Nullable<Artist[]>>(null);

  const { topArtists, topArtistsCount, getTopArtistsSuccess } =
    useTopArtists({
      authToken: auth.token,
      userId: user?.id,
      offset,
      limit: 15,
    });

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

  const shuffleTopArtists = () => {
    if (topArtistsCount) {
      const rand = getRandomInt(topArtistsCount - 10);
      setOffset(rand);
    }
  };

  useLayoutEffect(() => {
    if (searchValue.trim() === "" && getTopArtistsSuccess) {
      setArtists(topArtists);
      return;
    }
    if (searchResults) {
      setArtists(searchResults);
    }
  }, [
    searchResults,
    searchValue,
    topArtists,
    getTopArtistsSuccess,
  ]);

  return (
    <>
      <section className="filter-section">
        <header className="filter-section__header">
          <h1 className="filter-section__title">Artists</h1>
          <IconButton
            iconSrc={updateIcon}
            style={IconButtonStyles.Secondary}
            handleClick={shuffleTopArtists}
          />
          <Input
            label="Artists"
            handleChangeValue={handleSearchInputChange}
          />
        </header>
        <div className="filter-section__main">
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
        </div>
        <footer className="filter-section__footer">
          <em>See selected</em>
        </footer>
      </section>
    </>
  );
};

export default ArtistFilterSection;
