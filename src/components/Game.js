import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SelectionBox from "./SelectionBox";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./firebase";
import "../styles/game.css";
import Endgame from "./Endgame";

const Game = () => {
  const params = useParams();
  const [game, setGame] = useState("");
  const [shown, setShown] = useState(true);
  const [location, setLocation] = useState([0, 0]);
  const [gameOneCoordinates, setGameOneCoordinates] = useState([]);
  const [clickCoordinates, setClickCoordinates] = useState([]);
  const [itemSelection, setItemSelection] = useState("");
  const [gameOneItemsFound, setGameOneItemsFound] = useState([]);
  const [gameover, setGameover] = useState(false);

  const gameOneSelections = [
    "Waldo",
    "Quagmire",
    "Louise",
    "Patrick",
    "Dwight",
  ];
  const gameTwoSelections = ["Waldo", "Odlaw", "Wizard"];
  const gameThreeSelections = ["Waldo", "Odlaw", "Wizard"];

  const fetchGameOneCoords = async () => {
    const gameOneCoordsCollection = collection(
      database,
      "game-one-coordinates"
    );
    const coordsSnapshot = await getDocs(gameOneCoordsCollection);
    const gameOneCoordinates = coordsSnapshot.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    setGameOneCoordinates(gameOneCoordinates);
  };

  useEffect(() => {
    setGame(params.id);
    fetchGameOneCoords();
    console.log("reset game");
    setGameover(false);
    setGameOneItemsFound([]);
  }, []);

  useEffect(() => {
    console.log(gameOneCoordinates);
  }, [gameOneCoordinates]);

  useEffect(() => {
    console.log(gameOneItemsFound);
    if (gameOneItemsFound.length === 5) {
      setGameover(true);
    }
  }, [gameOneItemsFound]);

  useEffect(() => {
    console.log(itemSelection);
  }, [itemSelection]);

  useEffect(() => {
    console.log(`click coords updated ${clickCoordinates}`);
  }, [clickCoordinates]);

  const toggleDropdownMenu = (e) => {
    // console.log(obj);
    if (!shown) {
      setLocation([e.clientY, e.clientX]);
      setShown(!shown);
    } else {
      setLocation([e.clientY, e.clientX]);
      setShown(!shown);
    }
  };

  const checkMatch = (selection) => {
    let index;
    switch (selection) {
      case "Dwight":
        index = 0;
        break;
      case "Louise":
        index = 1;
        break;
      case "Patrick":
        index = 2;
        break;
      case "Quagmire":
        index = 3;
        break;
      case "Waldo":
        index = 4;
        break;
      default:
        index = null;
    }

    if (
      clickCoordinates[0] === gameOneCoordinates[index].data.x &&
      clickCoordinates[1] === gameOneCoordinates[index].data.y
    ) {
      console.log("match");
      setGameOneItemsFound((state) => [...state, gameOneCoordinates[index].id]);
      console.log(`${gameOneCoordinates[index].id} found`);
    } else {
      console.log("not match");
    }
  };

  const getClickCoordinates = (e) => {
    const y = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );
    const x = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    setClickCoordinates([x, y]);
    console.log(clickCoordinates);
    return { x, y };
  };

  if (gameover) {
    return (
      <Endgame
        gameInfo={
          "this should contain gameboard completed and time it took to complete"
        }
        gameboard={game}
      />
    );
  }

  if (game === "game1") {
    return (
      <div className="game-container">
        {/* <div id="find-text">Things to find</div> */}
        <div className="items-container">
          <div
            className={
              gameOneItemsFound.includes("waldo")
                ? "found item-card"
                : "not-found item-card"
            }
          >
            <img
              src={require("../assets/waldo.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div
            className={
              gameOneItemsFound.includes("quagmire")
                ? "found item-card"
                : "not-found item-card"
            }
          >
            <img
              src={require("../assets/Glenn_Quagmire.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div
            className={
              gameOneItemsFound.includes("louise")
                ? "found item-card"
                : "not-found item-card"
            }
          >
            <img
              src={require("../assets/louise.png")}
              alt="item"
              className="item-img louise"
            />
          </div>
          <div
            className={
              gameOneItemsFound.includes("patrick")
                ? "found item-card"
                : "not-found item-card"
            }
          >
            <img
              src={require("../assets/patrick.jpg")}
              alt="item"
              id="item-img"
            />
          </div>
          <div
            className={
              gameOneItemsFound.includes("dwight")
                ? "found item-card"
                : "not-found item-card"
            }
          >
            <img
              src={require("../assets/dwight.png")}
              alt="item"
              id="item-img"
            />
          </div>
        </div>
        <div className="gameboard">
          {location && !shown ? (
            <SelectionBox
              top={location[0]}
              left={location[1]}
              coordinates={clickCoordinates}
              selections={gameOneSelections}
              setItemSelection={setItemSelection}
              onClickHandler={checkMatch}
              setShown={setShown}
              shown={shown}
            />
          ) : null}
          <img
            src={require("../assets/game1.jpg")}
            alt="gameboard"
            id="gameboard-img"
            onClick={(e) => {
              getClickCoordinates(e);
              toggleDropdownMenu(e);
              console.log(gameOneCoordinates[0].data.x);
            }}
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
        <div className="gameboard">
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
            onClick={(e) => {
              getClickCoordinates(e);
              toggleDropdownMenu(e);
            }}
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
        <div className="gameboard">
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
            onClick={(e) => {
              getClickCoordinates(e);
              toggleDropdownMenu(e);
            }}
          />
        </div>
      </div>
    );
  }
};

export default Game;
