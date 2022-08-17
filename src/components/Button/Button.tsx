import "./button.scss";
import { ButtonStyles } from "../../lib/enums";

const Button = ({
  label,
  style,
  classes,
  handleClick,
}: {
  label: string;
  style: ButtonStyles;
  classes?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      className={`${style} ${classes}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
