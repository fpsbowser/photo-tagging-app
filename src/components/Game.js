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
  const [gameCoordinates, setGameCoordinates] = useState([]);
  const [clickCoordinates, setClickCoordinates] = useState([]);
  const [itemSelection, setItemSelection] = useState("");
  const [gameItemsFound, setGameItemsFound] = useState([]);
  const [gameover, setGameover] = useState(false);
  const [startTimer, setStartTimer] = useState(null);

  const gameOneSelections = [
    "Waldo",
    "Quagmire",
    "Louise",
    "Patrick",
    "Dwight",
  ];
  const gameTwoSelections = ["Waldo", "Odlaw", "Wizard"];
  const gameThreeSelections = ["Waldo", "Odlaw", "Wizard"];

  const fetchGameCoords = async (game) => {
    let collectionName;
    if (game === "game1") {
      collectionName = "game-one-coordinates";
    } else if (game === "game2") {
      collectionName = "game-two-coordinates";
    } else {
      collectionName = "game-three-coordinates";
    }
    const gameCoordsCollection = collection(database, collectionName);
    const coordsSnapshot = await getDocs(gameCoordsCollection);
    const fetchedGameCoordinates = coordsSnapshot.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    setGameCoordinates(fetchedGameCoordinates);
  };

  useEffect(() => {
    setGame(params.id);
    fetchGameCoords(params.id);
    // reset on mount
    setGameover(false);
    setGameItemsFound([]);
    // init start time
    setStartTimer(new Date());
  }, []);

  useEffect(() => {
    console.log(gameCoordinates);
  }, [gameCoordinates]);

  useEffect(() => {
    console.log(gameItemsFound);
    if (game === "game1" && gameItemsFound.length === 5) {
      setGameover(true);
    } else if (game === "game2" && gameItemsFound.length === 3) {
      setGameover(true);
    } else if (game === "game3" && gameItemsFound.length === 3) {
      setGameover(true);
    }
  }, [gameItemsFound]);

  useEffect(() => {
    console.log(itemSelection);
  }, [itemSelection]);

  useEffect(() => {
    console.log(`click coords updated ${clickCoordinates}`);
  }, [clickCoordinates]);

  const toggleDropdownMenu = (e) => {
    console.log(e);
    if (!shown) {
      setLocation([e.pageY, e.pageX]);
      setShown(!shown);
    } else {
      setLocation([e.pageY, e.pageX]);
      setShown(!shown);
    }
  };

  const checkMatch = (selection) => {
    let index;

    if (game === "game1") {
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
    } else {
      switch (selection) {
        case "Odlaw":
          index = 0;
          break;
        case "Waldo":
          index = 1;
          break;
        case "Wizard":
          index = 2;
          break;
        default:
          index = null;
      }
    }

    if (
      clickCoordinates[0] === gameCoordinates[index].data.x &&
      clickCoordinates[1] === gameCoordinates[index].data.y
    ) {
      console.log("match");
      setGameItemsFound((state) => [...state, gameCoordinates[index].id]);
      console.log(`${gameCoordinates[index].id} found`);
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
    const elapsedTime = new Date() - startTimer;
    return <Endgame gameboard={game} time={elapsedTime} />;
  }

  if (game === "game1") {
    return (
      <div className="game-container">
        {/* <div id="find-text">Things to find</div> */}
        <div className="items-container">
          <div
            className={
              gameItemsFound.includes("waldo")
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
              gameItemsFound.includes("quagmire")
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
              gameItemsFound.includes("louise")
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
              gameItemsFound.includes("patrick")
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
              gameItemsFound.includes("dwight")
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
              console.log(gameCoordinates[0].data.x);
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
          <div
            className={
              gameItemsFound.includes("waldo")
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
              gameItemsFound.includes("odlaw")
                ? "found item-card"
                : "not-found item-card"
            }
          >
            <img
              src={require("../assets/odlaw.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div
            className={
              gameItemsFound.includes("wizard")
                ? "found item-card"
                : "not-found item-card"
            }
          >
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
              coordinates={clickCoordinates}
              selections={gameTwoSelections}
              setItemSelection={setItemSelection}
              onClickHandler={checkMatch}
              setShown={setShown}
              shown={shown}
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
          <div
            className={
              gameItemsFound.includes("waldo")
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
              gameItemsFound.includes("odlaw")
                ? "found item-card"
                : "not-found item-card"
            }
          >
            <img
              src={require("../assets/odlaw.png")}
              alt="item"
              id="item-img"
            />
          </div>
          <div
            className={
              gameItemsFound.includes("wizard")
                ? "found item-card"
                : "not-found item-card"
            }
          >
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
              coordinates={clickCoordinates}
              selections={gameThreeSelections}
              setItemSelection={setItemSelection}
              onClickHandler={checkMatch}
              setShown={setShown}
              shown={shown}
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
