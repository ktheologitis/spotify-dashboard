import classNames from "classnames";
import { useState } from "react";
import "./song-card.scss";

const SongCard = ({
  imgSrc,
  name,
  album,
  selectable = false,
  selected = false,
  handleClick,
}: {
  imgSrc: string;
  name: string;
  album: string;
  selectable?: boolean;
  selected?: boolean | undefined;
  handleClick?: () => void;
}) => {
  const [isSelected, setIsSelected] = useState(
    selected ? selected : false
  );

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
        <img src={imgSrc} alt="song-pic" loading="lazy" />
      </section>
      <header className="song-card__name">{name}</header>
      <p className="song-card__album">{album}</p>
    </article>
  );
};

export default SongCard;
