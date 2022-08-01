import React from "react";
import { Link } from "react-router-dom";
import "../styles/gameselection.css";

const GameSelection = () => {
  // take games as prop

  // test games prop
  const defaultArray = [
    { image: "imageURL", gameName: "game1" },
    { image: "imageURL", gameName: "game2" },
    { image: "imageURL", gameName: "game3" },
  ];
  return (
    <div className="game-container">
      <div id="games-header">
        <h1 id="gameboard-text">Gameboards</h1>
      </div>
      <div className="games">
        {defaultArray.map((game, i) => {
          return (
            <Link to={`/${game.gameName}`} key={game.gameName}>
              <div
                className={`game-card ${game.gameName}`}
                onClick={(e) => {
                  console.log(e);
                }}
              ></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GameSelection;
