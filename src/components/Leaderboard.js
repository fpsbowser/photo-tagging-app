import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../styles/leaderboard.css";
import { database } from "./firebase";

export const Leaderboard = () => {
  const [levelOneLeaderboard, setLevelOneLeaderboard] = useState([]);
  const [levelTwoLeaderboard, setLevelTwoLeaderboard] = useState([]);
  const [levelThreeLeaderboard, setLevelThreeLeaderboard] = useState([]);

  const fetchLeaderboardOne = async () => {
    const leaderboardCollection = collection(database, "level-one-leaderboard");
    const leaderboardSnapshot = await getDocs(leaderboardCollection);
    const fetchedLeaderboard = leaderboardSnapshot.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    setLevelOneLeaderboard(fetchedLeaderboard);
  };

  const fetchLeaderboardTwo = async () => {
    const leaderboardCollection = collection(database, "level-two-leaderboard");
    const leaderboardSnapshot = await getDocs(leaderboardCollection);
    const fetchedLeaderboard = leaderboardSnapshot.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    setLevelTwoLeaderboard(fetchedLeaderboard);
  };

  const fetchLeaderboardThree = async () => {
    const leaderboardCollection = collection(
      database,
      "level-three-leaderboard"
    );
    const leaderboardSnapshot = await getDocs(leaderboardCollection);
    const fetchedLeaderboard = leaderboardSnapshot.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    setLevelThreeLeaderboard(fetchedLeaderboard);
  };

  useEffect(() => {
    fetchLeaderboardOne();
    fetchLeaderboardTwo();
    fetchLeaderboardThree();
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard">
        <div className="level-one">
          <h1 id="leaderboard-header">Level One</h1>
          <div id="name-header">Name:</div>
          <div id="time-header">Time:</div>
          {/* loop through database and return leaderboard */}
          <div className="entry-container">
            {levelOneLeaderboard.map((entry, i) => {
              return (
                <div className="entry" key={entry.id}>
                  <div id="entry-number">{i + 1}</div>
                  <div id="entry-name">{entry.data.name}</div>
                  <div id="entry-time">{entry.data.time}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="level-two">
          <h1 id="leaderboard-header">Level Two</h1>
          <div id="name-header">Name:</div>
          <div id="time-header">Time:</div>
          {/* loop through database and return leaderboard */}
          <div className="entry-container">
            {levelTwoLeaderboard.map((entry, i) => {
              return (
                <div className="entry" key={entry.id}>
                  <div id="entry-number">{i + 1}</div>
                  <div id="entry-name">{entry.data.name}</div>
                  <div id="entry-time">{entry.data.time}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="level-three">
          <h1 id="leaderboard-header">Level Three</h1>
          <div id="name-header">Name:</div>
          <div id="time-header">Time:</div>
          {/* loop through database and return leaderboard */}
          <div className="entry-container">
            {levelThreeLeaderboard.map((entry, i) => {
              return (
                <div className="entry" key={entry.id}>
                  <div id="entry-number">{i + 1}</div>
                  <div id="entry-name">{entry.data.name}</div>
                  <div id="entry-time">{entry.data.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
