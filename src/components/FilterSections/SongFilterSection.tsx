import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import { IconButtonStyles } from "../../lib/enums";
import updateIcon from "../../static/icons/update.svg";
import { Nullable, Song, SongsFilter } from "../../lib/types";
import { FilterState } from "../../hooks/useFilter";
import "./filter-section.scss";
import SongCard from "../SongCard/SongCard";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider";
import { useSearch } from "../../hooks/useSearch";
import { useUser } from "../../hooks/useUser";
import { useTopSongs } from "../../hooks/useTopSongs";
import { getArray, getRandomInt } from "../../lib/helpers";
import cloneDeep from "lodash.clonedeep";
import SelectedSongsDialog from "../SelectedSongsDialog/SelectedSongsDialog";
import SongCardSkeleton from "../SongCardSkeleton/SongCardSkeleton";

const SongFilterSection = ({
  songsFilter,
}: {
  songsFilter: FilterState<SongsFilter | null>;
}) => {
  const auth = useContext(AuthContext);
  const user = useUser(auth.token);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [songs, setSongs] = useState<Nullable<Song[]>>(null);
  const SONGS_LIMIT = 15;
  const songsSkeletonArray = getArray(SONGS_LIMIT);

  const {
    topSongs,
    topSongsCount,
    getTopSongsSuccess,
    topSongsLoading,
  } = useTopSongs({
    authToken: auth.token,
    userId: user?.id,
    offset: offset,
    limit: SONGS_LIMIT,
  });

  const {
    searchResults,
    getSearchResultsSuccess,
    isSearchLoading,
  } = useSearch<Song[]>(auth.token, searchValue, "track");

  const handleSongCardClick = (clickedSong: Song) => {
    if (songsFilter.filter?.ids.includes(clickedSong.id)) {
      const newIds = songsFilter.filter?.ids.filter(
        (id) => id !== clickedSong.id
      );
      const newSongs = cloneDeep(songsFilter.filter.data);
      const filtered = newSongs.filter(
        (song) => song.id !== clickedSong.id
      );
      songsFilter.set({
        ids: newIds,
        data: filtered,
      });
      return;
    }
    const newSongs = cloneDeep(songsFilter.filter?.data);
    songsFilter.filter
      ? songsFilter.set({
          ids: [...songsFilter.filter.ids, clickedSong.id],
          data: [...(newSongs as Song[]), clickedSong],
        })
      : songsFilter.set({
          ids: [clickedSong.id],
          data: [clickedSong],
        });
  };

  const handleSearchInputChange = useCallback(
    (newInput: string) => {
      setSearchValue(newInput);
    },
    []
  );

  const shuffleTopSongs = () => {
    if (topSongsCount) {
      const rand = getRandomInt(topSongsCount - 10);
      setOffset(rand);
    }
  };

  useLayoutEffect(() => {
    if (!searchValue.trim() && getTopSongsSuccess) {
      setSongs(topSongs);
    }
  }, [topSongs, getTopSongsSuccess, searchValue]);

  useLayoutEffect(() => {
    if (getSearchResultsSuccess) {
      setSongs(searchResults);
    }
  }, [getSearchResultsSuccess, searchResults]);

  return (
    <>
      <SelectedSongsDialog
        isOpen={isDialogOpen}
        title="Selected songs"
        songsFilter={songsFilter}
        handleSongCardClick={handleSongCardClick}
        closeDialog={() => {
          setIsDialogOpen(false);
        }}
      />
      <section className="filter-section">
        <header className="filter-section__header">
          <h1 className="filter-section__title">Songs</h1>

          <IconButton
            iconSrc={updateIcon}
            style={IconButtonStyles.Secondary}
            handleClick={shuffleTopSongs}
          />
          <Input
            label="Songs"
            loading={isSearchLoading}
            handleChangeValue={handleSearchInputChange}
          />
        </header>
        <div className="filter-section__main">
          {songs &&
            !topSongsLoading &&
            songs.map((song) => {
              return (
                <React.Fragment key={song.id}>
                  <SongCard
                    id={song.id}
                    images={song.album.images}
                    name={song.name}
                    album={song.album.name}
                    selectable
                    songsFilter={songsFilter.filter}
                    handleClick={() => {
                      handleSongCardClick(song);
                    }}
                  />
                </React.Fragment>
              );
            })}
          {topSongsLoading &&
            songsSkeletonArray.map((index) => {
              return <SongCardSkeleton key={index} />;
            })}
        </div>
        <footer className="filter-section__footer">
          <button
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            See selected
          </button>
        </footer>
      </section>
    </>
  );
};

export default SongFilterSection;
