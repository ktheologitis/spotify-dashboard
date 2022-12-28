import classNames from "classnames";
import { useState } from "react";
import { Image } from "../../lib/types";
import "./artist-card.scss";

const ArtistCard = ({
  name,
  images,
  selected,
  handleClick,
}: {
  name: string;
  images: Image[];
  selected?: boolean | undefined;
  handleClick?: () => void;
}) => {
  const [isSelected, setIsSelected] = useState(
    selected ? selected : false
  );

  let image = "";
  if (images.length === 1) image = images[0].url;
  else if (images.length > 1) image = images[1].url;

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
        <img src={image} alt="artist-pic" loading="lazy" />
      </div>
      <header className="artist-card__name">{name}</header>
    </article>
  );
};

export default ArtistCard;
