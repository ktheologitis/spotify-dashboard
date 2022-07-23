import "./song-card.scss";

const SongCard = ({
  imgSrc,
  name,
  album,
}: {
  imgSrc: string;
  name: string;
  album: string;
}) => {
  return (
    <article className="song-card">
      <section className="song-card__image">
        <img src={imgSrc} alt="song-pic" />
      </section>
      <header className="song-card__name">{name}</header>
      <p className="song-card__album">{album}</p>
    </article>
  );
};

export default SongCard;
