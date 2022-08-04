import React from "react";
import { Link } from "react-router-dom";

const Endgame = (props) => {
  const { gameInfo, gameboard } = props;
  return (
    <div className="endgame-container">
      <div>{gameboard}</div>
      <div className="button-container">
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Endgame;
