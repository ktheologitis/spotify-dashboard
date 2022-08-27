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
    <button className={style} onClick={handleClick}>
      <img
        src={iconSrc}
        className="icon"
        alt="icon"
        loading="lazy"
      />
    </button>
  );
};

export default IconButton;
