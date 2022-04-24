import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

// app
import App from "./App";

// context
import { AudioConfigProvider } from "./context/AudioConfig";
import { AudioControllerProvider } from "./context/AudioController";
import { SocketProvider } from "./context/SocketContext";

// style
import "./index.css";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
  <StrictMode>
    <SocketProvider>
      <AudioConfigProvider>
        <AudioControllerProvider>
          <App />
        </AudioControllerProvider>
      </AudioConfigProvider>
    </SocketProvider>
  </StrictMode>
);
