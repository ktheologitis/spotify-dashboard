import React, { useContext } from "react";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import FilterSection from "../../components/FilterSection/FilterSection";
import SongCard from "../../components/SongCard/SongCard";
import Chip from "../../components/Chip/Chip";
import IconButton from "../../components/IconButton/IconButton";
import SliderInput from "../../components/SliderInput/SliderInput";
import { Filters, IconButtonStyles } from "../../lib/enums";
import okIcon from "../../static/icons/ok.svg";
import "./filter-page.scss";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contextProviders/UserDataContextProvider/UserDataContextProvider";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../lib/api";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider/AuthorizationContextProvider";
import { FiltersContext } from "../../contextProviders/FiltersContextProvider/FiltersContextProvider";
import { FilterState, useFilter } from "../../hooks/useFilter";

const FilterPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = useContext(UserDataContext);
  const filters = useContext(FiltersContext);
  const genreData = useQuery(
    ["genres"],
    () => {
      return getGenres(auth.token);
    },
    {
      staleTime: Infinity,
    }
  );
  let artists;
  let songs;
  let genres;

  const artistsFilter = useFilter(filters.data?.artists);
  const songsFilter = useFilter(filters.data?.songs);
  const genresFilter = useFilter(filters.data?.genres);
  const loudnessFilter = useFilter(filters.data?.loudness);
  const valenceFilter = useFilter(filters.data?.valence);
  const acousticnessFilter = useFilter(
    filters.data?.acousticness
  );
  const danceabilityFilter = useFilter(
    filters.data?.danceability
  );

  const handleFilter = (
    filter: FilterState<string[] | null>,
    selected: string
  ) => {
    if (filter.data?.includes(selected)) {
      filter.set(
        filter.data.filter((item) => item !== selected)
      );
      return;
    }
    filter.data
      ? filter.set([...filter.data, selected])
      : filter.set([selected]);
  };

  const handleNumberFilter = (
    filter: FilterState<number | null>,
    value: number
  ) => {
    filter.set(value);
  };

  if (user && user.topArtists && user.topSongs) {
    artists = (
      <>
        {user.topArtists.map((artist) => {
          return (
            <React.Fragment key={artist.id}>
              <ArtistCard
                imgSrc={artist.images.medium}
                name={artist.name}
                selected={artistsFilter.data?.includes(
                  artist.id
                )}
                handleClick={() => {
                  handleFilter(artistsFilter, artist.id);
                }}
              />
            </React.Fragment>
          );
        })}
      </>
    );

    songs = (
      <>
        {user.topSongs.slice(0, 10).map((song) => {
          return (
            <React.Fragment key={song.id}>
              <SongCard
                imgSrc={song.images.medium}
                name={song.name}
                album={song.album}
                selectable={true}
                selected={songsFilter.data?.includes(song.id)}
                handleClick={() => {
                  handleFilter(songsFilter, song.id);
                }}
              />
            </React.Fragment>
          );
        })}
      </>
    );
  }

  if (genreData.data && genreData.data.genres) {
    genres = (
      <>
        {genreData.data.genres
          .slice(0, 10)
          .map((genre: string) => {
            return (
              <React.Fragment key={genre}>
                <Chip
                  label={genre}
                  selected={genresFilter.data?.includes(genre)}
                  handleClick={() => {
                    handleFilter(genresFilter, genre);
                  }}
                />
              </React.Fragment>
            );
          })}
      </>
    );
  }

  return (
    <main className="filter-page">
      <FilterSection
        type={Filters.Artist}
        title="Artists"
        filter={artists ? artists : <></>}
      />
      <FilterSection
        type={Filters.Song}
        title="Songs"
        filter={songs ? songs : <></>}
      />
      <FilterSection
        type={Filters.Genre}
        title="Genres"
        filter={genres ? genres : <></>}
      />
      <FilterSection
        type={Filters.AudioFeature}
        title="Acousticness"
        featureValue={acousticnessFilter?.data}
        filter={
          <div className="slider-wrapper">
            <SliderInput
              currentValue={
                acousticnessFilter.data
                  ? acousticnessFilter.data
                  : 0
              }
              handleChange={(newValue) => {
                handleNumberFilter(acousticnessFilter, newValue);
              }}
            />
          </div>
        }
      />
      <FilterSection
        type={Filters.AudioFeature}
        title="Valence"
        featureValue={valenceFilter?.data}
        filter={
          <div className="slider-wrapper">
            <SliderInput
              currentValue={
                valenceFilter.data ? valenceFilter.data : 0
              }
              handleChange={(newValue) => {
                handleNumberFilter(valenceFilter, newValue);
              }}
            />
          </div>
        }
      />
      <FilterSection
        type={Filters.AudioFeature}
        title="Danceability"
        featureValue={danceabilityFilter?.data}
        filter={
          <div className="slider-wrapper">
            <SliderInput
              currentValue={
                danceabilityFilter.data
                  ? danceabilityFilter.data
                  : 0
              }
              handleChange={(newValue) => {
                handleNumberFilter(danceabilityFilter, newValue);
              }}
            />
          </div>
        }
      />
      <FilterSection
        type={Filters.AudioFeature}
        title="Loudness"
        featureValue={loudnessFilter?.data}
        filter={
          <SliderInput
            currentValue={
              loudnessFilter.data ? loudnessFilter.data : 0
            }
            handleChange={(newValue) => {
              handleNumberFilter(loudnessFilter, newValue);
            }}
          />
        }
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
              filters.update({
                artists: artistsFilter.data,
                songs: songsFilter.data,
                genres: genresFilter.data,
                acousticness: acousticnessFilter.data,
                valence: valenceFilter.data,
                danceability: danceabilityFilter.data,
                loudness: loudnessFilter.data,
              });
            navigate("/recommendations");
          }}
        />
      </section>
    </main>
  );
};

export default FilterPage;
