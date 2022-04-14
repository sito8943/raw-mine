import * as PIXI from "pixi.js";

import pachan from "./assets/images/674.png";

import animateStars from "./pixi/stars";

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

// Create a new texture
const texture = PIXI.Texture.from(pachan);

// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
  const bunny = new PIXI.Sprite(texture);
  bunny.anchor.set(0.5);
  bunny.x = (i % 5) * 40;
  bunny.y = Math.floor(i / 5) * 40;
  container.addChild(bunny);
}

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
  // rotate the container!
  // use delta to create frame-independent transform
  container.rotation -= 0.01 * delta;
});

// Listen for animate update
app.ticker.add((delta) => {
  // Simple easing. This should be changed to proper easing function when used for real.
  speed += (warpSpeed - speed) / 20;
  cameraZ += delta * 10 * (speed + baseSpeed);
  for (let i = 0; i < starAmount; i++) {
    const star = stars[i];
    if (star.z < cameraZ) randomizeStar(star);

    // Map star 3d position to 2d with really simple projection
    const z = star.z - cameraZ;
    star.sprite.x =
      star.x * (fov / z) * app.renderer.screen.width +
      app.renderer.screen.width / 2;
    star.sprite.y =
      star.y * (fov / z) * app.renderer.screen.width +
      app.renderer.screen.height / 2;

    // Calculate star scale & rotation.
    const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
    const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
    const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
    const distanceScale = Math.max(0, (2000 - z) / 2000);
    star.sprite.scale.x = distanceScale * starBaseSize;
    // Star is looking towards center so that y axis is towards center.
    // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
    star.sprite.scale.y =
      distanceScale * starBaseSize +
      (distanceScale * speed * starStretch * distanceCenter) /
        app.renderer.screen.width;
    star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
  }
});
