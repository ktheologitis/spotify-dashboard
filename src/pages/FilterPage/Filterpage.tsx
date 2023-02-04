import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../hooks/useFilter";
import { IconButtonStyles } from "../../lib/enums";
import { FiltersContext } from "../../contextProviders/FiltersContextProvider";
import ArtistFilterSection from "../../components/FilterSections/ArtistFilterSection";
import SongFilterSection from "../../components/FilterSections/SongFilterSection";
import GenreFilterSection from "../../components/FilterSections/GenreFilterSection";
import AudioFeatureFilterSection from "../../components/FilterSections/AudioFeatureFilterSection";
import IconButton from "../../components/IconButton/IconButton";
import okIcon from "../../static/icons/ok.svg";
import "./filter-page.scss";

const FilterPage = () => {
  const navigate = useNavigate();
  const { filters, update } = useContext(FiltersContext);
  const artistsFilter = useFilter(filters?.artists);
  const songsFilter = useFilter(filters?.songs);
  const genresFilter = useFilter(filters?.genres);
  const loudnessFilter = useFilter(filters?.loudness);
  const valenceFilter = useFilter(filters?.valence);
  const acousticnessFilter = useFilter(filters?.acousticness);
  const danceabilityFilter = useFilter(filters?.danceability);

  return (
    <main className="filter-page">
      <ArtistFilterSection artistsFilter={artistsFilter} />
      <SongFilterSection songFilter={songsFilter} />
      <GenreFilterSection genresFilter={genresFilter} />
      <AudioFeatureFilterSection
        name="Acousticness"
        audioFeatureFilter={acousticnessFilter}
      />
      <AudioFeatureFilterSection
        name="Valence"
        audioFeatureFilter={valenceFilter}
      />
      <AudioFeatureFilterSection
        name="Danceability"
        audioFeatureFilter={danceabilityFilter}
      />
      <AudioFeatureFilterSection
        name="Loudness"
        audioFeatureFilter={loudnessFilter}
      />
      <section className="ok-icon-button">
        <IconButton
          iconSrc={okIcon}
          style={IconButtonStyles.Primary}
          handleClick={() => {
            if (
              artistsFilter.data &&
              songsFilter.data &&
              genresFilter.data
            )
              update({
                artists: artistsFilter.data,
                songs: songsFilter.data,
                genres: genresFilter.data,
                acousticness: acousticnessFilter.data,
                valence: valenceFilter.data,
                danceability: danceabilityFilter.data,
                loudness: loudnessFilter.data,
              });
            navigate("/");
          }}
        />
      </section>
    </main>
  );
};

export default FilterPage;
