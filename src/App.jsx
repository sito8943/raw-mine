// components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AudioController from "./components/AudioController/AudioController";

// views
import Game from "./views/Game/Game";
import Home from "./views/Home/Home";

const App = () => {
  return (
    <div>
      <AudioController />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
