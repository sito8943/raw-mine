// components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AudioController from "./components/AudioController/AudioController";
import Board from "./views/Board/Board";

// views
// import Game from "./views/Game/Game";
import Home from "./views/Home/Home";

const App = () => {
  return (
    <div>
      <AudioController />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
