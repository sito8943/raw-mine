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

const App = () => {
  const { setSocketState } = useSocket();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(config.serverUrl);
    setSocket(newSocket);
    setSocketState({ type: "socket", socket: newSocket });
    return () => newSocket.close();
  }, [setSocket]);

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
