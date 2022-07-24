import { IconButtonStyles } from "../../lib/enums";
import "./icon-button.scss";

const IconButton = ({
  iconSrc,
  style,
}: {
  iconSrc: string;
  style: IconButtonStyles;
}) => {
  return (
    <button className={style}>
      <img src={iconSrc} className="icon" alt="icon" />
    </button>
  );
};

export default IconButton;
