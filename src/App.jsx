import { useEffect, useState } from "react";

import config from "./config";

// react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// socket.io
import io from "socket.io-client";

// components
import AudioController from "./components/AudioController/AudioController";

// contexts
import { useSocket } from "./context/SocketContext";

// views
import Board from "./views/Board/Board";
import Home from "./views/Home/Home";

// texts
import texts from "./lang/texts.json";

const App = () => {
  const { setSocketState } = useSocket();
  const [lang, setLang] = useState("es");

  useEffect(() => {
    setLang(window.navigator.language.split("-")[0]);
  }, []);

  return (
    <div>
      <AudioController />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/game" element={<Board lang={lang} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
