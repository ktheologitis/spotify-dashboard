import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import { IconButtonStyles } from "../../lib/enums";
import informationIcon from "../../static/icons/information.svg";
import updateIcon from "../../static/icons/update.svg";
import "./entity-section.scss";

const EntitySection = ({
  title,
  entities,
}: {
  title: string;
  entities: JSX.Element;
}) => {
  return (
    <section className="entity-section">
      <header className="entity-section__header">
        <h1 className="entity-section__title">{title}</h1>
        <IconButton
          iconSrc={informationIcon}
          style={IconButtonStyles.Secondary}
        />
        <IconButton
          iconSrc={updateIcon}
          style={IconButtonStyles.Secondary}
        />
        <Input label={title} />
      </header>
      <main className="entity-section__main">{entities}</main>
      <footer className="entity-section__footer">
        <em>See selected</em>
      </footer>
    </section>
  );
};

export default EntitySection;
