import "./button.scss";
import { ButtonStyles } from "../../lib/enums";

const Button = ({
  label,
  style,
}: {
  label: string;
  style: ButtonStyles;
}) => {
  return <button className={`${style}`}>{label}</button>;
};

export default Button;
