import classNames from "classnames";
import { useState, useEffect } from "react";
import { ArtistsFilter, Image } from "../../lib/types";
import "./artist-card.scss";

const ArtistCard = ({
  id,
  name,
  images,
  artistsFilter,
  handleClick,
}: {
  id: string;
  name: string;
  images: Image[];
  artistsFilter?: ArtistsFilter | null;
  handleClick?: () => void;
}) => {
  const [isSelected, setIsSelected] = useState(
    artistsFilter ? artistsFilter?.ids.includes(id) : false
  );

  useEffect(() => {
    setIsSelected(
      artistsFilter ? artistsFilter?.ids.includes(id) : false
    );
  }, [artistsFilter, id]);

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
      <img
        className="artist-card__image"
        src={image}
        alt="pic"
        loading="lazy"
      />
      <header className="artist-card__name">{name}</header>
    </article>
  );
};

export default ArtistCard;
