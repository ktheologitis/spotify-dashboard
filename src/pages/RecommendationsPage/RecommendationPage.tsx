import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useRecomendations } from "../../hooks/useRecommendations";
import { useTopSongs } from "../../hooks/useTopSongs";
import { FiltersContext } from "../../contextProviders/FiltersContextProvider";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider";
import { Nullable, Song } from "../../lib/types";
import { IconButtonStyles } from "../../lib/enums";
import IconButton from "../../components/IconButton/IconButton";
import SongCard from "../../components/SongCard/SongCard";
import filterIcon from "../../static/icons/filter.svg";
import "./recommendations-page.scss";

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = useUser(auth.token);
  const { filters } = useContext(FiltersContext);
  const { topSongs } = useTopSongs({
    authToken: auth.token,
    userId: user?.id,
    limit: 30,
  });
  const recommendationData = useRecomendations({
    authToken: auth.token,
    filters,
    limit: 30,
  });

  let songs: Nullable<Song[]> = topSongs;

  if (recommendationData) {
    songs = recommendationData;
  }

  return (
    <main className="recommendations-page">
      <header>
        <h1 className="recommendations-page__title">
          Recommendations
        </h1>
      </header>
      <section className="recommendations-page__content">
        {songs &&
          songs.map((song) => {
            return (
              <React.Fragment key={song.id}>
                <SongCard
                  id={song.id}
                  images={song.album.images}
                  name={song.name}
                  album={song.album.name}
                  handleClick={() => {
                    window.open(
                      song.external_urls.spotify,
                      "_blank"
                    );
                  }}
                />
              </React.Fragment>
            );
          })}
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
