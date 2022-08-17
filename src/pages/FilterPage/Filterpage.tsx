import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGenres } from "../../hooks/useGenres";
import { FiltersContext } from "../../contextProviders/FiltersContextProvider";
import { UserDataContext } from "../../contextProviders/UserDataContextProvider";
import { FilterTypes, IconButtonStyles } from "../../lib/enums";
import IconButton from "../../components/IconButton/IconButton";
import okIcon from "../../static/icons/ok.svg";
import "./filter-page.scss";
import ArtistSelectionFilter from "../../components/ArtistSelectionFilter/ArtistSelectionFilter";
import SongSelectionFilter from "../../components/SongSelectionFilter/SongSelectionFilter";
import GenreSelectionFilter from "../../components/GenreSelectionFilter/GenreSelectionFilter";
import RangeFilter from "../../components/RangeFilter/RangeFilter";

const FilterPage = () => {
  const navigate = useNavigate();
  const user = useContext(UserDataContext);
  const filters = useContext(FiltersContext);
  const genreData = useGenres();

  const goToRecommendationsPage = useCallback(() => {
    navigate("/recommendations");
  }, [navigate]);

  return (
    <main className="filter-page">
      <ArtistSelectionFilter
        topArtists={user?.topArtists ? user.topArtists : null}
        selectedArtists={filters.data.artists}
        updateFilter={filters.update}
      />
      <SongSelectionFilter
        topSongs={user?.topSongs ? user.topSongs : null}
        selectedSongs={filters.data.songs}
        updateFilter={filters.update}
      />
      <GenreSelectionFilter
        genres={genreData.data?.genres}
        selectedGenres={filters.data.genres}
        updateFilter={filters.update}
      />
      <RangeFilter
        title="Acousticness"
        type={FilterTypes.Acousticness}
        data={filters.data.acousticness}
        updateFilter={filters.update}
      />
      <RangeFilter
        title="Valence"
        type={FilterTypes.Valence}
        data={filters.data.valence}
        updateFilter={filters.update}
      />
      <RangeFilter
        title="Danceability"
        type={FilterTypes.Danceability}
        data={filters.data.danceability}
        updateFilter={filters.update}
      />
      <RangeFilter
        title="Loudness"
        type={FilterTypes.Loudness}
        data={filters.data.loudness}
        updateFilter={filters.update}
      />
      <section className="ok-icon-button">
        <IconButton
          iconSrc={okIcon}
          style={IconButtonStyles.Primary}
          handleClick={goToRecommendationsPage}
        />
      </section>
    </main>
  );
};

export default FilterPage;
