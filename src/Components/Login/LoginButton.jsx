import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Login.module.css";
import { Navigate } from "react-router-dom";

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <button
            className={styles.login__btn}
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        </>
      ) : (
        <Navigate to="/search" />
      )}
    </div>
  );
}

export { LoginButton };
