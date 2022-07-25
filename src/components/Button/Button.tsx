import "./button.scss";
import { ButtonStyles } from "../../lib/enums";

const Button = ({
  label,
  style,
  handleClick,
}: {
  label: string;
  style: ButtonStyles;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button className={`${style}`} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
