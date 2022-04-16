// components
import AudioController from "./components/AudioController/AudioController";

// views
import Game from "./views/Game/Game";
import Home from "./views/Home/Home";

const App = () => {
  return (
    <div>
      <AudioController />
      <Game />
    </div>
  );
};

export default App;
