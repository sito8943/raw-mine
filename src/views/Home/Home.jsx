import { useEffect, useState, useRef } from "react";

import * as PIXI from "pixi.js";

// context
import { useAudioController } from "../../context/AudioController";

// layouts
import Welcome from "../../layouts/Welcome/Welcome";
import CharacterCreation from "../../layouts/CharacterCreation/CharacterCreation";

// assets
import starTextureImage from "../../assets/images/star.png";

// utils
import app from "../../utils/app";

// styles
import "./style.css";

let warpSpeed = 0;

// Get the texture for rope.
const starTexture = PIXI.Texture.from(starTextureImage);

const starAmount = 1000;
let cameraZ = 0;
const fov = 20;
const baseSpeed = 0.025;
let speed = 0;
const starStretch = 5;
const starBaseSize = 0.05;

// Create the stars
const stars = [];
for (let i = 0; i < starAmount; i++) {
  const star = {
    sprite: new PIXI.Sprite(starTexture),
    z: 0,
    x: 0,
    y: 0,
  };
  star.sprite.anchor.x = 0.5;
  star.sprite.anchor.y = 0.7;
  randomizeStar(star, true);
  app.stage.addChild(star.sprite);
  stars.push(star);
}

function randomizeStar(star, initial) {
  star.z = initial
    ? Math.random() * 2000
    : cameraZ + Math.random() * 1000 + 2000;

  // Calculate star positions with radial random coordinate so no star hits the camera.
  const deg = Math.random() * Math.PI * 2;
  const distance = Math.random() * 50 + 1;
  star.x = Math.cos(deg) * distance;
  star.y = Math.sin(deg) * distance;
}

const Home = (props) => {
  const ref = useRef(null);

  const { lang } = props;
  const { setAudioControllerState } = useAudioController();

  const [playerExist, setPlayerExist] = useState(false);
  const [started, setStarted] = useState(false);
  const [where, setWhere] = useState(0);
  const [warpSpeedS, setWarpSpeedS] = useState(0);

  const init = (delta) => {
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 80;
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
      const distanceCenter = Math.sqrt(
        dxCenter * dxCenter + dyCenter * dyCenter
      );
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
  };

  useEffect(() => {
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    // Start the PixiJS app
    app.start();

    app.ticker.add(init);

    return () => {
      // On unload stop the application
      app.stop();
    };
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("player");
    if (user !== null) setPlayerExist(true);
  }, []);

  useEffect(() => {
    warpSpeed = warpSpeedS;
  }, [warpSpeedS]);

  const start = () => {
    setStarted(true);
    setAudioControllerState({ type: "click" });
    setTimeout(() => {
      setWarpSpeedS(1);
    }, 1000);
    setTimeout(() => {
      setWarpSpeedS(0);
      setStarted(false);
      setWhere(1);
    }, 5000);
  };

  const creation = (name) => {
    localStorage.setItem("player", name);
    setStarted(true);
    setTimeout(() => {
      setWarpSpeedS(1);
    }, 1000);
    setTimeout(() => {
      window.location.href = "/game";
    }, 5000);
  };

  const existPlayer = () => {
    setAudioControllerState({ type: "click" });
    setStarted(true);
    setTimeout(() => {
      setWarpSpeedS(1);
    }, 1000);
    setTimeout(() => {
      window.location.href = "/game";
    }, 5000);
  };

  return (
    <div ref={ref}>
      <div
        className="main"
        style={{ opacity: started ? 0 : 1, zIndex: started ? 0 : 1 }}
      >
        {where === 0 && (
          <Welcome lang={lang} start={!playerExist ? start : existPlayer} />
        )}
        {where === 1 && <CharacterCreation lang={lang} start={creation} />}
      </div>
    </div>
  );
};

export default Home;
