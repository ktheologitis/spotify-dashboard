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
import { Nullable, Song } from "../../lib/types";
import { FilterState } from "../../hooks/useFilter";
import "./filter-section.scss";
import SongCard from "../SongCard/SongCard";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider";
import { useSearch } from "../../hooks/useSearch";

const SongFilterSection = ({
  topSongs,
  songFilter,
}: {
  topSongs: Nullable<Song[]>;
  songFilter: FilterState<string[] | null>;
}) => {
  const [songs, setSongs] = useState(topSongs);
  const [searchValue, setSearchValue] = useState("");

  const auth = useContext(AuthContext);
  const { searchResults, isLoading, isFetching } = useSearch<
    Song[]
  >(auth.token, searchValue, "track");

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

  const handleSearchInputChange = useCallback(
    (newInput: string) => {
      setSearchValue(newInput);
    },
    []
  );

  useLayoutEffect(() => {
    if (searchValue.trim() === "") {
      setSongs(topSongs);
      return;
    }
    if (searchResults) setSongs(searchResults);
  }, [searchResults, searchValue, topSongs]);

  return (
    <section className="filter-section">
      <header className="filter-section__header">
        <h1 className="filter-section__title">Songs</h1>

        <IconButton
          iconSrc={updateIcon}
          style={IconButtonStyles.Secondary}
        />
        <Input
          label="Songs"
          handleChangeValue={handleSearchInputChange}
        />
      </header>
      <div className="filter-section__main">
        {songs &&
          songs.map((song) => {
            return (
              <React.Fragment key={song.id}>
                <SongCard
                  images={song.album.images}
                  name={song.name}
                  album={song.album.name}
                  selectable
                  selected={songFilter.data?.includes(song.id)}
                  handleClick={() => {
                    handleSongCardClick(song.id);
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
  );
};

export default SongFilterSection;
