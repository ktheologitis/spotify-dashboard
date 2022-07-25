import { IconButtonStyles } from "../../lib/enums";
import "./icon-button.scss";

const IconButton = ({
  iconSrc,
  style,
  handleClick,
}: {
  iconSrc: string;
  style: IconButtonStyles;
  handleClick?: () => void;
}) => {
  return (
    <button className={style}>
      <img
        src={iconSrc}
        className="icon"
        alt="icon"
        onClick={handleClick}
      />
    </button>
  );
};

export default IconButton;
