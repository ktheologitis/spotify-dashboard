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
import {
  Artist,
  ArtistsFilter,
  Nullable,
} from "../../lib/types";
import ArtistCard from "../ArtistCard/ArtistCard";
import { FilterState } from "../../hooks/useFilter";
import "./filter-section.scss";
import { getArray, getRandomInt } from "../../lib/helpers";
import { useUser } from "../../hooks/useUser";
import { useTopArtists } from "../../hooks/useTopArtists";
import cloneDeep from "lodash.clonedeep";
import SelectedArtistsDialog from "../SelectedArtistsDialog/SelectedArtistsDialog";
import ArtistCardSkeleton from "../ArtistCardSkeleton/ArtistCardSkeleton";

const ArtistFilterSection = ({
  artistsFilter,
}: {
  artistsFilter: FilterState<ArtistsFilter | null>;
}) => {
  const auth = useContext(AuthContext);
  const user = useUser(auth.token);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [artists, setArtists] =
    useState<Nullable<Artist[]>>(null);
  const ARTISTS_LIMIT = 15;
  const artistSkeletonArray = getArray(ARTISTS_LIMIT);

  const {
    topArtists,
    topArtistsCount,
    getTopArtistsSuccess,
    topArtisIsLoading,
  } = useTopArtists({
    authToken: auth.token,
    userId: user?.id,
    offset,
    limit: ARTISTS_LIMIT,
  });

  const {
    searchResults,
    getSearchResultsSuccess,
    isSearchLoading,
  } = useSearch<Artist[]>(auth.token, searchValue, "artist");

  const handleArtistCardClick = (clickedArtist: Artist) => {
    if (artistsFilter.filter?.ids.includes(clickedArtist.id)) {
      const newIds = artistsFilter.filter?.ids.filter(
        (id) => id !== clickedArtist.id
      );
      const newArtists = cloneDeep(artistsFilter.filter.data);
      const filtered = newArtists.filter(
        (artist) => artist.id !== clickedArtist.id
      );
      artistsFilter.set({
        ids: newIds,
        data: filtered,
      });
      return;
    }
    const newArtists = cloneDeep(artistsFilter.filter?.data);
    artistsFilter.filter
      ? artistsFilter.set({
          ids: [...artistsFilter.filter.ids, clickedArtist.id],
          data: [...(newArtists as Artist[]), clickedArtist],
        })
      : artistsFilter.set({
          ids: [clickedArtist.id],
          data: [clickedArtist],
        });
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
    if (!searchValue.trim() && getTopArtistsSuccess) {
      setArtists(topArtists);
    }
  }, [topArtists, getTopArtistsSuccess, searchValue]);

  useLayoutEffect(() => {
    if (getSearchResultsSuccess) {
      setArtists(searchResults);
    }
  }, [getSearchResultsSuccess, searchResults]);

  return (
    <>
      <SelectedArtistsDialog
        isOpen={isDialogOpen}
        title="Selected artists"
        artistsFilter={artistsFilter}
        handleArtistCardClick={handleArtistCardClick}
        closeDialog={() => {
          setIsDialogOpen(false);
        }}
      />
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
            loading={isSearchLoading}
            handleChangeValue={handleSearchInputChange}
          />
        </header>
        <div className="filter-section__main">
          {artists &&
            !topArtisIsLoading &&
            artists.map((artist) => {
              return (
                <React.Fragment key={artist.id}>
                  <ArtistCard
                    id={artist.id}
                    images={artist.images}
                    name={artist.name}
                    artistsFilter={artistsFilter.filter}
                    handleClick={() => {
                      handleArtistCardClick(artist);
                    }}
                  />
                </React.Fragment>
              );
            })}
          {topArtisIsLoading &&
            artistSkeletonArray.map((index) => {
              return <ArtistCardSkeleton key={index} />;
            })}
        </div>
        <footer className="filter-section__footer">
          <button
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            See selected{" "}
            {artistsFilter.filter?.ids.length
              ? `(${artistsFilter.filter?.ids.length})`
              : ""}
          </button>
        </footer>
      </section>
    </>
  );
};

export default ArtistFilterSection;
