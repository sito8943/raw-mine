import "./style.css";

const GameOver = () => {
  return (
    <div className="game-over">
      <div className="home-form">
        <h1>Te han destruido</h1>
        <a href="/" className="link">
          Volver a empezar
        </a>
      </div>
    </div>
  );
};

export default GameOver;
