import classNames from "classnames";
import { useState } from "react";
import { Image } from "../../lib/types";
import "./song-card.scss";

const SongCard = ({
  images,
  name,
  album,
  selectable = false,
  selected = false,
  handleClick,
}: {
  images: Image[];
  name: string;
  album: string;
  selectable?: boolean;
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
      className={classNames("song-card", {
        "song-card--selected": isSelected,
      })}
      onClick={() => {
        selectable && setIsSelected(!isSelected);
        handleClick && handleClick();
      }}
    >
      <section className="song-card__image">
        <img src={image} alt="song-pic" loading="lazy" />
      </section>
      <header className="song-card__name">{name}</header>
      <p className="song-card__album">{album}</p>
    </article>
  );
};

export default SongCard;
