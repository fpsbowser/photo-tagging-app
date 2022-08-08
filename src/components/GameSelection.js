import React from "react";
import { Link } from "react-router-dom";
import "../styles/gameselection.css";

const GameSelection = (props) => {
  // take games as prop
  const { games } = props;

  return (
    <div className="game-container">
      <div className="level-text-container">
        <h2>Level 1</h2>
        <h2>Level 2</h2>
        <h2>Level 3</h2>
      </div>
      <div className="games">
        {games.map((game) => {
          return (
            <Link to={`/${game.gameName}`} key={game.gameName}>
              <div className={`game-card ${game.gameName}`}></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GameSelection;
