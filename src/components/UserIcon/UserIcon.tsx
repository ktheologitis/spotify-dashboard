import "./user-icon.scss";

const UserIcon = ({
  imgSrc,
  userName,
}: {
  imgSrc: string;
  userName: string;
}) => {
  return (
    <div className="user-icon">
      <img
        src={imgSrc}
        className="user-icon__image"
        alt="profile-pic"
      />
      <p className="user-icon__name">{userName}</p>
    </div>
  );
};

export default UserIcon;
