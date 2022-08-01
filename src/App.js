import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Game from "./components/Game";
import Nav from "./components/Nav";
import Leaderboard from "./components/Leaderboard";
import Home from "./components/Home";
import Social from "./components/Social";
import "./styles/app.css";

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/:id" element={<Game />} />
      </Routes>
      <Social />
    </Router>
  );
};

export default App;
