import { useContext } from "react";
import classNames from "classnames";
import { useUser } from "../../hooks/useUser";
import "./user-icon.scss";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider";

const UserIcon = () => {
  const auth = useContext(AuthContext);
  const user = useUser(auth.token);

  return (
    <div
      className={classNames("user-icon", {
        "user-icon--hidden": !user,
      })}
    >
      <img
        src={user?.images[0]?.url}
        className="user-icon__image"
        alt="profile-pic"
        loading="lazy"
      />
      <p className="user-icon__name">{user?.display_name}</p>
    </div>
  );
};

export default UserIcon;
