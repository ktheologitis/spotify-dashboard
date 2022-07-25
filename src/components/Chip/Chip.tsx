import classNames from "classnames";
import { useState } from "react";
import "./chip.scss";

const Chip = ({
  label,
  selected,
  handleClick,
}: {
  label: string;
  selected?: boolean | undefined;
  handleClick: () => void;
}) => {
  const [isSelected, setSelected] = useState(
    selected ? selected : false
  );

  return (
    <div
      className={classNames("chip", {
        "chip--selected": isSelected,
      })}
      onClick={() => {
        setSelected(!isSelected);
        handleClick();
      }}
    >
      {label}
    </div>
  );
};

export default Chip;
