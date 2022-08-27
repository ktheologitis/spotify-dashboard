import classNames from "classnames";
import { useState } from "react";
import "./artist-card.scss";

const ArtistCard = ({
  name,
  imgSrc,
  selected,
  handleClick,
}: {
  name: string;
  imgSrc: string;
  selected?: boolean | undefined;
  handleClick?: () => void;
}) => {
  const [isSelected, setIsSelected] = useState(
    selected ? selected : false
  );

  return (
    <article
      className={classNames("artist-card", {
        "artist-card--selected": isSelected,
      })}
      onClick={() => {
        handleClick && setIsSelected(!isSelected);
        handleClick && handleClick();
      }}
    >
      <div className="artist-card__image">
        <img src={imgSrc} alt="artist-pic" loading="lazy" />
      </div>
      <header className="artist-card__name">{name}</header>
    </article>
  );
};

export default ArtistCard;
