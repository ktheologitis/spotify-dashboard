import "./dialog.scss";
import x from "../../static/icons/x.svg";
import Button from "../Button/Button";
import { ButtonStyles } from "../../lib/enums";

const Dialog = ({
  header,
  message,
  buttonLabel,
}: {
  header?: string;
  message?: string | JSX.Element;
  buttonLabel: string;
}) => {
  return (
    <div className="overlay">
      <section className="dialog">
        <header className="dialog__header">
          <h1 className="dialog__header-message">{header}</h1>
          <img
            className="dialog__exit-icon"
            src={x}
            alt="exit-icon"
          />
        </header>
        <main className="dialog__main-message">{message}</main>
        <footer className="dialog__actions">
          <Button
            label={buttonLabel}
            style={ButtonStyles.Primary}
          />
        </footer>
      </section>
    </div>
  );
};

export default Dialog;
