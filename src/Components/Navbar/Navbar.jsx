import React from "react";
import { ImBooks } from "react-icons/im";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router";
import { LogoutButton } from "../index";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className={styles.navbar__wrapper}>
      <div
        className={styles.brand__wrapper}
        onClick={() => navigate("/search")}
      >
        <ImBooks className={styles.brand__icon} />
        <h1>Book Kart</h1>
      </div>
      <LogoutButton />
    </div>
  );
}

export { Navbar };
