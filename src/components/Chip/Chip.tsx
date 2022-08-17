import classNames from "classnames";
import "./chip.scss";

const Chip = ({
  label,
  isSelected,
  handleClick,
}: {
  label: string;
  isSelected?: boolean;
  handleClick: (genre: string) => void;
}) => {
  return (
    <div
      className={classNames("chip", {
        "chip--selected": isSelected,
      })}
      onClick={() => {
        handleClick(label);
      }}
    >
      {label}
    </div>
  );
};

export default Chip;
