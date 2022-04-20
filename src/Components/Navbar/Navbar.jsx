import React from "react";
import { ImBooks } from "react-icons/im";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router";
import { LogoutButton } from "../index";
import { BiUserCircle } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    <div className={styles.navbar__wrapper}>
      <div
        className={styles.brand__wrapper}
        onClick={() => navigate("/search")}
      >
        <ImBooks className={styles.brand__icon} />
        <h1>Book Kart</h1>
      </div>
      <div className={styles.user__logout__wrapper}>
        {isAuthenticated && (
          <button
            className={styles.profile__btn}
            onClick={() => navigate("/user")}
          >
            <BiUserCircle className={styles.profile__icon} />
            <p>Profile</p>
          </button>
        )}
        <LogoutButton />
      </div>
    </div>
  );
}

export { Navbar };
