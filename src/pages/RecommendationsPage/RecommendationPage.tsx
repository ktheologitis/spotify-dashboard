import React, { useContext } from "react";
import IconButton from "../../components/IconButton/IconButton";
import SongCard from "../../components/SongCard/SongCard";
import { IconButtonStyles } from "../../lib/enums";
import filterIcon from "../../static/icons/filter.svg";
import "./recommendations-page.scss";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contextProviders/UserDataContextProvider/UserDataContextProvider";
import { useRecomendations } from "../../hooks/useRecommendations";

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const user = useContext(UserDataContext);
  const recommendationData = useRecomendations();

  let songs;
  let recommendations;

  if (recommendationData) {
    recommendations = (
      <>
        {recommendationData.map((song) => {
          return (
            <React.Fragment key={song.id}>
              <SongCard
                imgSrc={song.images.medium}
                name={song.name}
                album={song.album}
                handleClick={() => {
                  window.open(song.external_url, "_blank");
                }}
              />
            </React.Fragment>
          );
        })}
      </>
    );
  }

  if (user && user.topSongs) {
    songs = (
      <>
        {user.topSongs.map((song) => {
          return (
            <React.Fragment key={song.id}>
              <SongCard
                imgSrc={song.images.medium}
                name={song.name}
                album={song.album}
                handleClick={() => {
                  window.open(song.external_url, "_blank");
                }}
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
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-7 mt-5">
        {recommendations ? recommendations : songs}
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
