import "./dialog.scss";

const Dialog = ({
  isOpen,
  title,
  mainContent,
  primaryButton,
  secondaryButton,
}: {
  isOpen: boolean;
  title?: string;
  mainContent?: string | JSX.Element;
  primaryButton?: JSX.Element;
  secondaryButton?: JSX.Element;
}) => {
  return (
    <>
      {isOpen && (
        <div className="overlay">
          <section className="dialog">
            <header className="dialog__header">
              <h1 className="dialog__header-message">{title}</h1>
            </header>
            <div className="dialog__main-content">
              {mainContent}
            </div>
            <footer className="dialog__actions">
              {secondaryButton}
              {primaryButton}
            </footer>
          </section>
        </div>
      )}
    </>
  );
};

export default Dialog;
