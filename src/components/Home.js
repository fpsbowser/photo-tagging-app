import React from "react";
import GameSelection from "./GameSelection";

export const Home = () => {
  const games = [
    { image: "imageURL", gameName: "game1" },
    { image: "imageURL", gameName: "game2" },
    { image: "imageURL", gameName: "game3" },
  ];
  return <GameSelection games={games} />;
};
export default Home;
