import "./icon-button.scss";

const IconButton = ({ iconSrc }: { iconSrc: string }) => {
  return (
    <button className="icon-button">
      <img
        src={iconSrc}
        className="icon-button__icon"
        alt="icon"
      />
    </button>
  );
};

export default IconButton;
