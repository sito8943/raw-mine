import { Link } from "react-router-dom";
import "./style.css";

const GameOver = () => {
  return (
    <div className="game-over">
      <div className="home-form">
        <h1>Te han destruido</h1>
        <Link to="/game" style={{ textDecoration: "none" }}>
          Volver a empezar
        </Link>
      </div>
    </div>
  );
};

export default GameOver;
