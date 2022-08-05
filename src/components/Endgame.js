import React from "react";
import "../styles/endgame.css";

const Endgame = (props) => {
  const { gameboard, time } = props;

  let seconds = Math.round(time / 1000);
  let minutes = Math.round(seconds / 60);
  let game;

  if (gameboard === "game1") {
    game = "gameboard one";
  } else if (gameboard === "game2") {
    game = "gameboard two";
  } else {
    game = "gameboard three";
  }
  return (
    <div className="endgame-container">
      <div id="finish-text">
        You finished {game}, with a time of {minutes}:{seconds}!
      </div>
      <div id="end-form">Would you like to publish to leaderboard?</div>
      <div className="button-container">
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>
  );
};

export default Endgame;
