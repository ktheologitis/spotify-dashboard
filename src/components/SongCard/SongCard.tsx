import classNames from "classnames";
import React from "react";
import "./song-card.scss";

const SongCard = ({
  id,
  name,
  album,
  img,
  url,
  isSelected = false,
  handleClick,
  handleOpenOnSpotify,
}: {
  id: string;
  name: string;
  album: string;
  img: string;
  url?: string;
  isSelected?: boolean;
  handleClick?: (id: string) => void;
  handleOpenOnSpotify?: (url: string) => void;
}) => {
  return (
    <article
      className={classNames("song-card", {
        "song-card--selected": isSelected,
      })}
      onClick={() => {
        handleClick && handleClick(id);
        handleOpenOnSpotify && url && handleOpenOnSpotify(url);
      }}
    >
      <section className="song-card__image">
        <img src={img} alt="song-pic" />
      </section>
      <header className="song-card__name">{name}</header>
      <p className="song-card__album">{album}</p>
    </article>
  );
};

export default React.memo(SongCard);
