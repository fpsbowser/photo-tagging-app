import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";
export const Nav = () => {
  return (
    <nav>
      <Link to={"/"}>
        <img src={require("../assets/home.png")} alt="home" id="home-btn" />
      </Link>
      <Link to={"/about"}>
        <h3 id="nav-link">About</h3>
      </Link>
      <Link to={"/leaderboard"}>
        <h3 id="nav-link">Leaderboard</h3>
      </Link>
    </nav>
  );
};

export default Nav;
