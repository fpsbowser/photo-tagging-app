import React from "react";

export const Leaderboard = (props) => {
  const { gameInfo } = props;

  return (
    <div>
      <h1>Leaderboard</h1>
      <div className="game-info">{gameInfo}</div>
    </div>
  );
};

export default Leaderboard;
