import React from "react";
import "../styles/about.css";

export const About = () => {
  return (
    <div className="about-container">
      <h1 id="about-header">About</h1>
      <p id="description">
        This was a project following{" "}
        <a
          id="odin-link"
          href="https://www.theodinproject.com/lessons/node-path-javascript-where-s-waldo-a-photo-tagging-app"
        >
          [TheOdinProject]
        </a>
        &nbsp;curriculum. The goal of this project is to continue expanding
        knowledge with the React library and start working with the backend.
        This project utilizes Firebase as the backend and stores all game data
        and stats for each level.
      </p>
      <p id="description">
        When a player selects a level, the correct game component renders and a
        timer starts. A fetch call is sent to Firebase when the game component
        mounts and saves the coordinates for the hidden characters to state.
        When a player clicks on the gameboard a custom submenu pops up where the
        player clicked. This menu has selections for each of the hidden
        characters in the level. When a selection is made, the coordinates where
        the player clicked and the character selection they made are checked
        with the Firebase data to see if it matches. If it is a match the border
        of the character found will turn green. When the player finds all the
        hidden characters the timer stops and renders an "endscreen" showing the
        completion time and displays an input to enter name to add their score
        to the leaderboard.
      </p>
    </div>
  );
};

export default About;
