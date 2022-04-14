import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#222333",
  resolution: window.devicePixelRatio || 1,
});

export default app;
