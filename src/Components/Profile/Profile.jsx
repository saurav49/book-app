import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <article className={styles.article__wrapper}>
        {user?.picture && (
          <img
            src={user.picture}
            alt={user?.name}
            className={styles.profile__img}
            referrerpolicy="no-referrer"
          />
        )}
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </article>
    )
  );
};

export { Profile };
