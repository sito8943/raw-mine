import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: 20 * 35,
  height: 20 * 35,
  backgroundColor: "#222333",
  resolution: window.devicePixelRatio || 1,
});

export default app;
