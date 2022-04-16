import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Login.module.css";

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();
  const handleLogout = () => {
    logout();
    localStorage.removeItem("book__token");
  };
  return (
    <div>
      {isAuthenticated && (
        <button
          className={`${styles.login__btn} ${styles.logout__btn}`}
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export { LogoutButton };
