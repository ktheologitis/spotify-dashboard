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
import { getArray } from "../../lib/helpers";
import SongCardSkeleton from "../../components/SongCardSkeleton/SongCardSkeleton";

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
  const RECOMMENDATIONS_LIMIT = 30;
  const recommendationsArray = getArray(RECOMMENDATIONS_LIMIT);
  const { recommendations, isLoading } = useRecomendations({
    authToken: auth.token,
    filters,
    limit: RECOMMENDATIONS_LIMIT,
  });

  let songs: Nullable<Song[]> = topSongs;

  if (recommendations) {
    songs = recommendations;
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
          !isLoading &&
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
        {isLoading &&
          recommendationsArray.map((index) => {
            return <SongCardSkeleton key={index} />;
          })}
      </section>
      <section className="filter-icon-button">
        <IconButton
          iconSrc={filterIcon}
          style={IconButtonStyles.Primary}
          handleClick={() => {
            navigate("/");
          }}
        />
      </section>
    </main>
  );
};

export default RecommendationsPage;
