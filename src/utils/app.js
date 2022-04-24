import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#006f03",
  resolution: window.devicePixelRatio,
});

export default app;
