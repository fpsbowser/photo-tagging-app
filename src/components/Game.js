import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SelectionBox from "./SelectionBox";
import "../styles/game.css";

const Game = () => {
  const params = useParams();
  console.log(params);
  const [game, setGame] = useState("");
  const [shown, setShown] = useState(true);
  const [location, setLocation] = useState([0, 0]);

  const gameOneSelections = [
    "Waldo",
    "Quagmire",
    "Louise",
    "Patrick",
    "Dwight",
  ];
  const gameOneCoords = [
    [302, 764],
    [838, 468],
    [269, 437],
    [330, 1229],
    [586, 743],
  ];
  const gameTwoSelections = ["Waldo", "Odlaw", "Wizard"];
  const gameTwoCoords = [
    [568, 803],
    [521, 296],
    [395, 503],
  ];
  // bottom left, middle right, middle left
  const gameThreeSelections = ["Waldo", "Odlaw", "Wizard"];
  const gameThreeCoords = [
    [705, 255],
    [351, 1268],
    [364, 483],
  ];

  const targetBoxStyle = (e) => {
    return `position: absolute; top: ${e.clientY}px; left: ${e.clientX}px; width: 10px; height: 10px; background: black;`;
  };

  useEffect(() => {
    setGame(params.id);
  }, []);

  const toggleDropdownMenu = (e) => {
    if (!shown) {
      setLocation([e.clientY, e.clientX]);
      setShown(!shown);
    } else {
      setLocation([e.clientY, e.clientX]);
      setShown(!shown);
    }
  };

  if (game === "game1") {
    return (
      <div className="game-container">
        {/* <div id="find-text">Things to find</div> */}
        <div className="items-container">
          <div className="item-card not-found">
            <img
              src={require("../assets/waldo.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div className="item-card not-found">
            <img
              src={require("../assets/Glenn_Quagmire.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div className="item-card not-found">
            <img
              src={require("../assets/louise.png")}
              alt="item"
              className="item-img louise"
            />
          </div>
          <div className="item-card not-found">
            <img
              src={require("../assets/patrick.jpg")}
              alt="item"
              id="item-img"
            />
          </div>
          <div className="item-card not-found">
            <img
              src={require("../assets/dwight.png")}
              alt="item"
              id="item-img"
            />
          </div>
        </div>
        <div
          className="gameboard"
          onClick={(e) => {
            console.log(e.clientY);
            console.log(e.clientX);
            toggleDropdownMenu(e);
          }}
        >
          {location && !shown ? (
            <SelectionBox
              top={location[0]}
              left={location[1]}
              selections={gameOneSelections}
            />
          ) : null}
          <img
            src={require("../assets/game1.jpg")}
            alt="gameboard"
            id="gameboard-img"
          />
        </div>
      </div>
    );
  } else if (game === "game2") {
    return (
      <div className="game-container">
        {/* <div id="find-text">Things to find</div> */}
        <div className="items-container">
          <div className="item-card not-found">
            <img
              src={require("../assets/waldo.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div className="item-card not-found">
            <img
              src={require("../assets/odlaw.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div className="item-card not-found">
            <img
              src={require("../assets/wizard.png")}
              alt="item"
              id="item-img"
            />
          </div>
        </div>
        <div
          className="gameboard"
          onClick={(e) => {
            console.log(e.clientY);
            console.log(e.clientX);
            toggleDropdownMenu(e);
          }}
        >
          {location && !shown ? (
            <SelectionBox
              top={location[0]}
              left={location[1]}
              selections={gameTwoSelections}
            />
          ) : null}
          <img
            src={require("../assets/game2.png")}
            alt="gameboard"
            id="gameboard-img"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="game-container">
        {/* <div id="find-text">Things to find</div> */}
        <div className="items-container">
          <div className="item-card not-found">
            <img
              src={require("../assets/waldo.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div className="item-card not-found">
            <img
              src={require("../assets/odlaw.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div className="item-card not-found">
            <img
              src={require("../assets/wizard.png")}
              alt="item"
              id="item-img"
            />
          </div>
        </div>
        <div
          className="gameboard"
          onClick={(e) => {
            console.log(e.clientY);
            console.log(e.clientX);
            toggleDropdownMenu(e);
          }}
        >
          {location && !shown ? (
            <SelectionBox
              top={location[0]}
              left={location[1]}
              selections={gameThreeSelections}
            />
          ) : null}
          <img
            src={require("../assets/game3.jpg")}
            alt="gameboard"
            id="gameboard-img"
          />
        </div>
      </div>
    );
  }
};

export default Game;
