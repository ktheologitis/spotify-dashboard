import "./artist-card.scss";

const ArtistCard = ({
  name,
  imgSrc,
}: {
  name: string;
  imgSrc: string;
}) => {
  return (
    <article className="artist-card">
      <div className="artist-card__image">
        <img src={imgSrc} alt="artist-pic" />
      </div>
      <header className="artist-card__name">{name}</header>
    </article>
  );
};

export default ArtistCard;
