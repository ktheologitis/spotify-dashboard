import classNames from "classnames";
import "./user-icon.scss";

const UserIcon = ({
  imgSrc = "",
  userName = "",
  show,
}: {
  imgSrc?: string;
  userName?: string;
  show: boolean;
}) => {
  return (
    <div
      className={classNames("user-icon", {
        "user-icon--hidden": !show,
      })}
    >
      <img
        src={imgSrc}
        className="user-icon__image"
        alt="profile-pic"
        loading="lazy"
      />
      <p className="user-icon__name">{userName}</p>
    </div>
  );
};

export default UserIcon;
