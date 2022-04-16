import { useEffect, useState, useRef } from "react";

import * as PIXI from "pixi.js";

// context
import { useAudioController } from "../../context/AudioController";
import { useAudioConfig } from "../../context/AudioConfig";

import back from "../../assets/images/back.png";
import characterImg from "../../assets/images/character.png";
import enemyIMG from "../../assets/images/674.png";
import spark from "../../assets/images/spark.gif";

// utils
import app from "../../utils/app";

// models
import Weapon, { WeaponsEnum } from "../../models/weapon";
import Player from "../../models/player";
import Enemy, { EnemiesEnum } from "../../models/enemy";

// styles
import "./style.css";

let playerX = 0;
let playerY = 0;

// back
const sprite = new PIXI.Sprite.from(back);
sprite.width = app.screen.width;
sprite.height = app.screen.height;
sprite.interactive = true;

// character
const character = new PIXI.Sprite.from(characterImg);
const enemy = new PIXI.Sprite.from(characterImg);

character.width = 60;
character.height = 60;
enemy.width = 60;
enemy.height = 60;

let mouseX = 0;
let mouseY = 0;

let sparks = [];
let sparkXs = [];
let sparkYs = [];
let sparkCount = 0;
// let sparkA = new PIXI.Sprite.from(spark);

// keys intervals
let iDown = null;
let iRight = null;
let iLeft = null;
let iUp = null;
// fire
let fDown = null;
let fRight = null;
let fLeft = null;
let fUp = null;

// fire intervals
let fires = [];

// all colliders
let allColliders = [
  new Player(
    {
      name: "Sito",
      life: { max: 15, current: 15 },
      weapon: new Weapon(WeaponsEnum[3]),
    },
    character
  ),
  new Enemy(EnemiesEnum[0], enemy),
];

const player = allColliders[0];

let onReload = false;

const Game = () => {
  const ref = useRef(null);

  const { useConfigState, setAudioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();

  const [mousePosition, setMousePosition] = useState();
  const [w, setW] = useState(false);
  const [attackSpeed, setAttackSpeed] = useState(player.Weapon.Reload);

  useEffect(() => {
    if (onReload)
      setTimeout(() => {
        onReload = false;
        setAudioControllerState({ type: "reloaded" });
      }, [attackSpeed]);
  }, [onReload]);

  useEffect(() => {
    if (!w) clearInterval(iUp);
    else {
      executeMoveUp();
      clearInterval(iRight);
      clearInterval(iDown);
      clearInterval(iLeft);
    }
  }, [w]);

  const [a, setA] = useState(false);

  useEffect(() => {
    if (!a) clearInterval(iLeft);
    else {
      executeMoveLeft();
      clearInterval(iRight);
      clearInterval(iDown);
      clearInterval(iUp);
    }
  }, [a]);

  const [d, setD] = useState(false);

  useEffect(() => {
    if (!d) clearInterval(iRight);
    else {
      executeMoveRight();
      clearInterval(iUp);
      clearInterval(iDown);
      clearInterval(iLeft);
    }
  }, [d]);

  const [s, setS] = useState(false);

  useEffect(() => {
    if (!s) clearInterval(iDown);
    else {
      executeMoveDown();
      clearInterval(iRight);
      clearInterval(iUp);
      clearInterval(iLeft);
    }
  }, [s]);

  const [up, setUp] = useState(false);

  useEffect(() => {
    if (!up) clearInterval(fUp);
    else {
      executeFireUp();
      clearInterval(fRight);
      clearInterval(fDown);
      clearInterval(fLeft);
    }
  }, [up]);

  const [left, setLeft] = useState(false);

  useEffect(() => {
    if (!left) clearInterval(fLeft);
    else {
      executeFireLeft();
      clearInterval(fUp);
      clearInterval(fDown);
      clearInterval(fRight);
    }
  }, [left]);

  const [right, setRight] = useState(false);

  useEffect(() => {
    if (!right) clearInterval(fRight);
    else {
      executeFireRight();
      clearInterval(fLeft);
      clearInterval(fDown);
      clearInterval(fUp);
    }
  }, [right]);

  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!down) clearInterval(fDown);
    else {
      executeFireDown();
      clearInterval(fRight);
      clearInterval(fUp);
      clearInterval(fLeft);
    }
  }, [down]);

  const onClick = (e) => {
    const { global, button } = e.data;
    mouseX = global.x;
    mouseY = global.y;
    if (button === 2) {
      // collect();
    } else {
      // fire();
    }
  };

  const executeFireUp = () => {
    if (!onReload) {
      setAudioControllerState({ type: "shot" });
      onReload = true;
      sparkCount += 1;
      const newLength = sparkCount;
      sparks[newLength] = new PIXI.Sprite.from(spark);
      sparkXs[newLength] = playerX + 30;
      sparkYs[newLength] = playerY + 30;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });

      const index = fires.length;
      let newI = setInterval(() => {
        sparkYs[newLength] -= player.Weapon.Speed;
        if (sparkYs[newLength] < -10 || hasCollisions(sparks[newLength])) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    } else setAudioControllerState({ type: "reloading" });

    // reload and fire
    fUp = setInterval(() => {
      sparkCount += 1;
      setAudioControllerState({ type: "shot" });
      onReload = true;
      const newLength = sparkCount;
      sparks[newLength] = new PIXI.Sprite.from(spark);
      sparkXs[newLength] = playerX + 30;
      sparkYs[newLength] = playerY + 30;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });
      const index = fires.length;
      let newI = setInterval(() => {
        sparkYs[newLength] -= player.Weapon.Speed;
        if (sparkYs[newLength] < -10 || hasCollisions(sparks[newLength])) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    }, player.Weapon.Reload + 150);
  };

  const executeFireRight = () => {
    if (!onReload) {
      setAudioControllerState({ type: "shot" });
      onReload = true;
      sparkCount += 1;
      const newLength = sparkCount;
      sparks[newLength] = new PIXI.Sprite.from(spark);
      sparkXs[newLength] = playerX + 30;
      sparkYs[newLength] = playerY + 30;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });

      const index = fires.length;
      let newI = setInterval(() => {
        sparkXs[newLength] += player.Weapon.Speed;
        if (
          sparkXs[newLength] > app.screen.width ||
          hasCollisions(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    } else setAudioControllerState({ type: "reloading" });

    // reload and fire
    fRight = setInterval(() => {
      sparkCount += 1;
      setAudioControllerState({ type: "shot" });
      const newLength = sparkCount;
      sparks[newLength] = new PIXI.Sprite.from(spark);
      sparkXs[newLength] = playerX + 30;
      sparkYs[newLength] = playerY + 30;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });
      const index = fires.length;
      let newI = setInterval(() => {
        sparkXs[newLength] += player.Weapon.Speed;
        if (
          sparkXs[newLength] > app.screen.width ||
          hasCollisions(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    }, player.Weapon.Reload);
  };

  const executeFireDown = () => {
    if (!onReload) {
      setAudioControllerState({ type: "shot" });
      onReload = true;
      sparkCount += 1;
      const newLength = sparkCount;
      sparks[newLength] = new PIXI.Sprite.from(spark);
      sparkXs[newLength] = playerX + 30;
      sparkYs[newLength] = playerY + 30;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });

      const index = fires.length;
      let newI = setInterval(() => {
        sparkYs[newLength] += player.Weapon.Speed;
        if (
          sparkYs[newLength] > app.screen.height ||
          hasCollisions(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    } else setAudioControllerState({ type: "reloading" });

    // reload and fire
    fDown = setInterval(() => {
      sparkCount += 1;
      setAudioControllerState({ type: "shot" });
      const newLength = sparkCount;
      sparks[newLength] = new PIXI.Sprite.from(spark);
      sparkXs[newLength] = playerX + 30;
      sparkYs[newLength] = playerY + 30;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });
      const index = fires.length;
      let newI = setInterval(() => {
        sparkYs[newLength] += player.Weapon.Speed;
        if (sparkYs[newLength] < -10 || hasCollisions(sparks[newLength])) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    }, player.Weapon.Reload);
  };

  const executeFireLeft = () => {
    if (!onReload) {
      setAudioControllerState({ type: "shot" });
      onReload = true;
      sparkCount += 1;
      const newLength = sparkCount;
      sparks[newLength] = new PIXI.Sprite.from(spark);
      sparkXs[newLength] = playerX + 30;
      sparkYs[newLength] = playerY + 30;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });

      const index = fires.length;
      let newI = setInterval(() => {
        sparkXs[newLength] -= player.Weapon.Speed;
        if (sparkXs[newLength] < -10 || hasCollisions(sparks[newLength])) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    } else setAudioControllerState({ type: "reloading" });

    // reload and fire
    fLeft = setInterval(() => {
      sparkCount += 1;
      setAudioControllerState({ type: "shot" });
      const newLength = sparkCount;
      sparks[newLength] = new PIXI.Sprite.from(spark);
      sparkXs[newLength] = playerX + 30;
      sparkYs[newLength] = playerY + 30;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });
      const index = fires.length;
      let newI = setInterval(() => {
        sparkXs[newLength] -= player.Weapon.Speed;
        if (sparkXs[newLength] < -10 || hasCollisions(sparks[newLength])) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    }, player.Weapon.Reload);
  };

  const executeMoveUp = () => {
    iUp = setInterval(() => {
      if (playerY >= 5) playerY -= 1;
    }, 10);
  };
  const executeMoveLeft = () => {
    iLeft = setInterval(() => {
      if (playerX >= 5) playerX -= 1;
    }, 10);
  };
  const executeMoveRight = () => {
    iRight = setInterval(() => {
      if (playerX <= app.screen.width) playerX += 1;
    }, 10);
  };
  const executeMoveDown = () => {
    iDown = setInterval(() => {
      if (playerY <= app.screen.height) playerY += 1;
    }, 10);
  };

  useEffect(() => {
    document.body.onkeydown = keyPress;
    document.body.onkeyup = keyRelease;
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    // Start the PixiJS app
    app.start();

    sprite.on("pointerdown", onClick);
    app.stage.addChild(sprite);
    app.stage.addChild(enemy);

    playerX = app.screen.width / 2;
    playerY = app.screen.height / 2;

    character.x = playerX;
    character.y = playerY;

    enemy.x = 200;
    enemy.y = 200;

    app.ticker.add((delta) => {
      character.x = playerX;
      character.y = playerY;
    });

    app.stage.addChild(character);

    return () => {
      // On unload stop the application
      app.stop();
    };
  }, []);

  const keyRelease = (e) => {
    const { key } = e;
    switch (key) {
      case "w":
      case "W":
        return setW(false);
      case "d":
      case "D":
        return setD(false);
      case "s":
      case "S":
        return setS(false);
      case "a":
      case "A":
        return setA(false);
      case "ArrowUp":
        return setUp(false);
      case "ArrowRight":
        return setRight(false);
      case "ArrowDown":
        return setDown(false);
      case "ArrowLeft":
        return setLeft(false);
      default:
        break;
    }
  };

  const keyPress = (e) => {
    const { key } = e;
    switch (key) {
      case "w":
      case "W":
        setW(true);
        break;
      case "d":
      case "D":
        setD(true);
        break;
      case "s":
      case "S":
        setS(true);
        break;
      case "a":
      case "A":
        setA(true);
        break;
      case "ArrowUp":
        return setUp(true);
      case "ArrowRight":
        return setRight(true);
      case "ArrowDown":
        return setDown(true);
      case "ArrowLeft":
        return setLeft(true);
      default:
        break;
    }
  };

  const handleDirection = (e) => {
    const { id } = e.target;
    switch (id) {
      case "fup":
        return executeFireUp();
      case "fright":
        return executeFireRight();
      case "fleft":
        return executeFireLeft();
      case "fdown":
        return executeFireDown();
      case "up":
        playerY -= 1;
        break;
      case "right":
        playerX += 1;
        break;
      case "down":
        playerY += 1;
        break;
      default: //left
        playerX -= 1;
    }
  };

  const hasCollisions = (sprite) => {
    for (let i = 0; i < allColliders.length; ++i) {
      if (allColliders[i].Name === "Sito") continue;
      if (!allColliders[i].IsAlive()) continue;
      const currentSprite = allColliders[i].Sprite;
      let xss = false;
      // going by left
      if (
        sprite.x + sprite.width >= currentSprite.x &&
        sprite.x + sprite.width <= currentSprite.x + currentSprite.width
      ) {
        xss = true;
      }
      // going by right
      else if (
        sprite.x >= currentSprite.x &&
        sprite.x <= currentSprite.x + currentSprite.width
      ) {
        xss = true;
      }
      if (xss) {
        // down collision
        if (
          sprite.y >= currentSprite.y &&
          sprite.y <= currentSprite.y + currentSprite.height
        ) {
          if (allColliders[i].TakeDamage(player.Weapon.Damage))
            app.stage.removeChild(currentSprite);
          return true;
        }
        // up collision
        else if (
          sprite.y + sprite.height >= currentSprite.y &&
          sprite.y + sprite.height <= currentSprite.y + currentSprite.height
        ) {
          if (allColliders[i].TakeDamage(player.Weapon.Damage))
            app.stage.removeChild(currentSprite);
          return true;
        }
      }
    }
  };

  return (
    <div ref={ref}>
      <div className="keys">
        <div className="wContainer">
          <button
            id="up"
            className={w ? "active" : ""}
            onClick={handleDirection}
          >
            W
          </button>
        </div>
        <div className="adContainer">
          <button
            id="left"
            className={a ? "active" : ""}
            onClick={handleDirection}
          >
            A
          </button>
          <button
            id="right"
            className={d ? "active" : ""}
            onClick={handleDirection}
          >
            D
          </button>
        </div>
        <div className="wContainer">
          <button
            id="down"
            className={s ? "active" : ""}
            onClick={handleDirection}
          >
            S
          </button>
        </div>
      </div>
      <div className="arrows">
        <div className="wContainer">
          <button
            id="fup"
            className={`arrow ${up ? "active" : ""}`}
            onClick={handleDirection}
          >
            ↑
          </button>
        </div>
        <div className="adContainer">
          <button
            id="fleft"
            className={`arrow ${left ? "active" : ""}`}
            onClick={handleDirection}
          >
            ←
          </button>
          <button
            id="fright"
            className={`arrow ${right ? "active" : ""}`}
            onClick={handleDirection}
          >
            →
          </button>
        </div>
        <div className="wContainer">
          <button
            id="fdown"
            className={`arrow ${down ? "active" : ""}`}
            onClick={handleDirection}
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
