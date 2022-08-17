import classNames from "classnames";
import React from "react";
import "./artist-card.scss";

const ArtistCard = ({
  id,
  name,
  img,
  isSelected,
  handleClick,
}: ArtistCardProps) => {
  return (
    <article
      className={classNames("artist-card", {
        "artist-card--selected": isSelected,
      })}
      onClick={() => {
        handleClick(id);
      }}
    >
      <div className="artist-card__image">
        <img src={img} alt="artist-pic" />
      </div>
      <header className="artist-card__name">{name}</header>
    </article>
  );
};
export default React.memo(ArtistCard);

type ArtistCardProps = {
  id: string;
  name: string;
  img: string;
  isSelected: boolean;
  handleClick: (id: string) => void;
};
