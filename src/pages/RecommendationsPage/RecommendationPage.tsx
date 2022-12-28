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
  const topSongs = useTopSongs(auth.token, user?.id);
  const { filters } = useContext(FiltersContext);
  const recommendationData = useRecomendations(
    auth.token,
    filters
  );

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
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-7 mt-5">
        {songs &&
          songs.map((song) => {
            return (
              <React.Fragment key={song.id}>
                <SongCard
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
