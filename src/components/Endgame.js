import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../styles/endgame.css";
import { database } from "./firebase";
import Leaderboard from "./Leaderboard";

const Endgame = (props) => {
  const { gameboard, time } = props;
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, []);

  const convertTime = () => {
    let minutes = Math.floor(time / 60000);
    let seconds = ((time % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  let correctTime = convertTime(time);
  let game;

  const update = (e) => {
    e.preventDefault();
    let levelCollection;
    if (inputValue === "") {
      return;
    }
    if (gameboard === "game1") {
      levelCollection = "level-one-leaderboard";
    } else if (gameboard === "game2") {
      levelCollection = "level-two-leaderboard";
    } else {
      levelCollection = "level-three-leaderboard";
    }
    const levelOneLeaderboard = collection(database, levelCollection);
    addDoc(levelOneLeaderboard, { name: inputValue, time: correctTime })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setInputValue("");
    setSubmitted(true);
  };

  if (gameboard === "game1") {
    game = "level one";
  } else if (gameboard === "game2") {
    game = "level two";
  } else {
    game = "level three";
  }

  if (submitted) {
    return <Leaderboard />;
  } else {
    return (
      <div className="endgame-container">
        <div className="form-container">
          <div id="finish-text">
            You finished {game}, with a time of {correctTime}!
          </div>
          <div id="end-form">
            If you want to publish your time to the leaderboard please enter
            your name below
          </div>
          <div className="input-container">
            <form onSubmit={update}>
              <input
                id="name-input"
                placeholder="Enter name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {/* <Link to={"/leaderboard"}> */}
              <button id="publish-button" type="submit">
                Publish
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Endgame;
