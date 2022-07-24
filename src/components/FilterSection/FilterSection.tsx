import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import { Filters, IconButtonStyles } from "../../lib/enums";
import informationIcon from "../../static/icons/information.svg";
import updateIcon from "../../static/icons/update.svg";
import "./filter-section.scss";
import classNames from "classnames";

const FilterSection = ({
  type,
  title,
  filter,
}: {
  type: Filters;
  title: string;
  filter: JSX.Element;
}) => {
  const iconButtons = (
    <>
      <IconButton
        iconSrc={informationIcon}
        style={IconButtonStyles.Secondary}
      />
      <IconButton
        iconSrc={updateIcon}
        style={IconButtonStyles.Secondary}
      />
    </>
  );

  const standardHeaderContent = (
    <>
      {iconButtons}
      <Input label={title} />
    </>
  );

  const genresHeaderContent = <>{iconButtons}</>;

  const audioFeaturesHeaderContent = (
    <div className="audio-feature-value">
      Value<span> %</span>
    </div>
  );

  return (
    <section className="entity-section">
      <header className="entity-section__header">
        <h1 className="entity-section__title">{title}</h1>
        {type === Filters.Artist && standardHeaderContent}
        {type === Filters.Song && standardHeaderContent}
        {type === Filters.Genre && genresHeaderContent}
        {type === Filters.AudioFeature &&
          audioFeaturesHeaderContent}
      </header>
      (title = "Genres" ? "entity-section__main--genres" :
      "entity-section__main")
      <main
        className={classNames({
          "entity-section__main":
            type === Filters.Artist || type === Filters.Song,
          "entity-section__main--genres": type === Filters.Genre,
          "entity-section__main--audio-feature":
            type === Filters.AudioFeature,
        })}
      >
        {filter}
      </main>
      {type !== Filters.AudioFeature && (
        <footer className="entity-section__footer">
          <em>See selected</em>
        </footer>
      )}
    </section>
  );
};

export default FilterSection;
