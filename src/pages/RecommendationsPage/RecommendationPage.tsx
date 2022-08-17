import React, { useCallback, useContext } from "react";
import IconButton from "../../components/IconButton/IconButton";
import SongCard from "../../components/SongCard/SongCard";
import { IconButtonStyles } from "../../lib/enums";
import filterIcon from "../../static/icons/filter.svg";
import "./recommendations-page.scss";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contextProviders/UserDataContextProvider";
import { useRecomendations } from "../../hooks/useRecommendations";

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const user = useContext(UserDataContext);
  const recommendationData = useRecomendations();

  let default_songs;
  let recommendations;

  const handleOpenOnSpotify = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  if (recommendationData) {
    recommendations = (
      <>
        {recommendationData.map((song) => {
          return (
            <React.Fragment key={song.id}>
              <SongCard
                id={song.id}
                name={song.name}
                img={song.images.medium}
                url={song.external_url}
                album={song.album}
                handleOpenOnSpotify={handleOpenOnSpotify}
              />
            </React.Fragment>
          );
        })}
      </>
    );
  }

  if (user && user.topSongs) {
    default_songs = (
      <>
        {user.topSongs.map((song) => {
          return (
            <React.Fragment key={song.id}>
              <SongCard
                id={song.id}
                img={song.images.medium}
                name={song.name}
                url={song.external_url}
                album={song.album}
                handleOpenOnSpotify={handleOpenOnSpotify}
              />
            </React.Fragment>
          );
        })}
      </>
    );
  }

  return (
    <main className="recommendations-page">
      <header>
        <h1 className="recommendations-page__title">
          Recommendations
        </h1>
      </header>
      <section className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-7 mt-5">
        {recommendations ? recommendations : default_songs}
      </section>
      <section className="filter-icon-button">
        <IconButton
          iconSrc={filterIcon}
          style={IconButtonStyles.Primary}
          handleClick={() => {
            navigate("/filter");
          }}
        />
      </section>
    </main>
  );
};

export default RecommendationsPage;
