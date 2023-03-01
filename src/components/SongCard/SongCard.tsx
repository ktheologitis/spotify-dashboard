import classNames from "classnames";
import { useState, useEffect } from "react";
import { Image, SongsFilter } from "../../lib/types";
import "./song-card.scss";

const SongCard = ({
  id,
  images,
  name,
  album,
  selectable = false,
  songsFilter,
  handleClick,
}: {
  id: string;
  images: Image[];
  name: string;
  album: string;
  selectable?: boolean;
  songsFilter?: SongsFilter | null;
  handleClick?: () => void;
}) => {
  const [isSelected, setIsSelected] = useState(
    songsFilter ? songsFilter?.ids.includes(id) : false
  );

  useEffect(() => {
    setIsSelected(
      songsFilter ? songsFilter?.ids.includes(id) : false
    );
  }, [songsFilter, id]);

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
      <img
        className="song-card__image"
        src={image}
        alt="song-pic"
        loading="lazy"
      />
      <header className="song-card__name">{name}</header>
      <p className="song-card__album">{album}</p>
    </article>
  );
};

export default SongCard;
